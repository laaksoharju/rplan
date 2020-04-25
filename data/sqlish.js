var Operations = function(operation_id) {
  this.operation_id = operation_id,
  this.steps = []
}

Operations.prototype.steps = [];

Operations.prototype.addStep = function(step) {
  this.steps.push(step);
}

var Resource = function (id, name, level, ack) {
  this.id = id;
  this.name = name;
  this.level = level;
  this.ack = ack;
  this.schedule = [];
}

var Step = function (order, resource_group_id, resource_group_name, ack, duration) {
  this.order = order;
  this.resource_group_id = resource_group_id;
  this.name = resource_group_name;
  this.ack = ack;
  this.duration = duration;
  this.steps = [];
  this.resource = [];
}

async function asyncFunction() {
  let conn;
  try {
	  conn = await pool.getConnection();
	  const rows = await conn.query("SELECT 1 as val");
	  console.log(rows); //[ {val: 1}, meta: ... ]
  } 
  catch (err) {
	  throw err;
  } 
  finally {
	  if (conn) return conn.end();
  }
}

function getScheduleForResource(resource) {
  var query = 
    'SELECT start_time, duration ' + 
    'FROM resources_scheduled ' + 
    'WHERE resource_id = ? ' + 
    'AND start_time > ?';

  return new Promise(function(resolve, reject) {
    let date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);

    let dateString = 
      date.getFullYear() + "-" +
      date.getMonth() +  "-" + 
      date.getDate()  + " " + 
      date.getHours() + ":" +
      date.getMinutes() + ":" +
      date.getSeconds();
    
      getConnection.query(query, [resource.id, dateString], async function(err, rows) {
      if (err) reject(err);
      
      await Promise.all(rows.map(function(row) {
        resource.schedule.push({ starttime: row.start_time, duration: row.duration });
      })); 

      resolve(resource);
    });
  });
}

function getNameAndLevelOnResource(step, resource_id, operation_id, ack) {
  var query = 
    'SELECT resource_name, level, resources.resource_id ' +
    'FROM resource_capabilities ' + 
    'LEFT JOIN resources ON resource_capabilities.resource_id = resources.resource_id ' +
    'WHERE resource_capabilities.resource_id = ? ' +
    'AND resource_capabilities.operation_id = ?';

  return new Promise(function(resolve, reject) {
    getConnection.query(query, [resource_id, operation_id], async function(err, rows) {
      if (err) reject(err);

      await Promise.all(rows.map(async function(row) {
        var resource = new Resource(
          row.resource_id, 
          row.resource_name, 
          row.level,
          ack,
          row.duration
        );

        await getScheduleForResource(resource);
        step.resource.push(resource);
      }));
      resolve(step);
    });
  });
}

function getSteps(operation, step, resource_group_id, ack) {
  var query = 
    'SELECT resource_groups.resource_group_id, resource_id, child_resource_group_id, resource_group_name ' + 
    'FROM resource_group_members ' + 
    'LEFT JOIN resource_groups ON resource_group_members.child_resource_group_id = resource_groups.resource_group_id ' + 
    'WHERE resource_group_members.resource_group_id = ?';
  
  return new Promise((resolve, reject) => {
    getConnection.query(query, [resource_group_id], async function(err, rows) {
      if (err) {
        reject(err);
      } else {
        await Promise.all(rows.map(async function(row) {
          if (row.resource_id !== 0) {
            await getNameAndLevelOnResource(step, row.resource_id, operation.operation_id, ack);
          } else {        
            var sub_step = new Step(
              row.order, 
              row.resource_group_id, 
              row.resource_group_name,
              ack,
              row.duration
            );

            step.steps.push(sub_step);

            await getSteps(operation, sub_step, row.resource_group_id, ack + 1);
          }
        }));
        
        resolve(operation);
      }
    })
  });
}

function getOperationSteps(operation, operation_id) {
  var query = 
    'SELECT * FROM operation_steps ' +
    'LEFT JOIN resource_groups ' +
    'ON operation_steps.resource_group_id = resource_groups.resource_group_id ' +  
    'WHERE operation_id = ? ' +
    'ORDER BY operation_steps.order';

  return new Promise(async function(resolve, reject) {
    getConnection.query(query, [operation_id], async function(err, rows) {
      if (err) { 
        reject(err);
      } else {
        await Promise.all(rows.map(async function(row) {
          var step = new Step(row.order, 
            row.resource_group_id, 
            row.resource_group_name,
            0,
            row.duration);

          operation.addStep(step);

          await getSteps(operation, step, row.resource_group_id, 1);
        }));

        resolve(operation);
      }
    });
  });
}

exports.operation_get = async function(req) {
  var operation = new Operation(req.params.id);
  await getOperationSteps(operation, req.params.id);
    
  return operation;
}
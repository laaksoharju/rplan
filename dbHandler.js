'use strict';

let csv = require("csvtojson");

let prognosisRoomsDataName = "prognosis_rooms";


let defaultLanguage = "en";

DB.prototype.getPrognosisRooms = function () {
    // import pr_json from ("./data/" + prognosisRoomsDataName + ".json");
    var pr_json=require("./data/" + prognosisRoomsDataName + ".json");
    return pr_json;
  }


// Store data in an object to keep the global namespace clean
function DB() {
    this.db = {};
}


module.exports = DB;

/*const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'mydb.com', 
     user:'rplan', 
     password: 'gr2020odt',
     connectionLimit: 5
});
async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}*/
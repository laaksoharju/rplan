'use strict';

let csv = require("csvtojson");
const fs = require('fs');

let prognosisPatDataName = "prognosis_pat";
let prognosisStaffDataName = "prognosis_staff";
let outcomeStaffDataName = "outcome_staff";
let prognosisRoomsDataName = "prognosis_rooms";


let defaultLanguage = "en";

DB.prototype.getPrognosisRooms = function () {
    var pr_json=require("./data/" + prognosisRoomsDataName + ".json");
    return pr_json;
}

DB.prototype.setPrognosisRooms = function (newData) {
    fs.writeFileSync("./data/" + prognosisRoomsDataName + ".json", JSON.stringify(newData), null, 2);
    console.log("setPrognosisRooms", JSON.stringify(newData))
}

DB.prototype.getPrognosisStaff = function () {
  var pr_json=require("./data/" + prognosisStaffDataName + ".json");
  return pr_json;
}

DB.prototype.setPrognosisStaff = function (newData) {
  fs.writeFileSync("./data/" + prognosisStaffDataName + ".json", JSON.stringify(newData), null, 2);
  console.log("setPrognosisStaff", JSON.stringify(newData))
}

DB.prototype.getPrognosisPat = function () {
  var pr_json=require("./data/" + prognosisPatDataName + ".json");
  return pr_json;
}

DB.prototype.setPrognosisPat = function (newData) {
  fs.writeFileSync("./data/" + prognosisPatDataName + ".json", JSON.stringify(newData), null, 2);
  console.log("setPrognosisStaff", JSON.stringify(newData))
}


DB.prototype.getOutcomeStaff = function () {
  var pr_json=require("./data/" + outcomeStaffDataName + ".json");
  return pr_json;
}

DB.prototype.setOutcomeStaff = function (newData) {
  fs.writeFileSync("./data/" + outcomeStaffDataName + ".json", JSON.stringify(newData), null, 2);
  console.log("setOutcomeStaff", JSON.stringify(newData))
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
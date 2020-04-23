'use strict';

let csv = require("csvtojson");

let prognosisPatDataName = "prognosis_pat";
let prognosisStaffDataName = "prognosis_staff";
let defaultLanguage = "en";

// Store data in an object to keep the global namespace clean
function Data() {
  this.data = {};
}

Data.prototype.getUILabels = function (lang) {
  var ui = require("./data/ui_" + (lang || defaultLanguage) + ".json");
  return ui;
};

Data.prototype.getPrognosisPat = function () {
  var d = this.data;
  return d[prognosisPatDataName]
}

Data.prototype.getPrognosisStaff = function () {
  var d = this.data;
  return d[prognosisStaffDataName]
}

/*
  Function to load initial data from CSV files into the object
*/
Data.prototype.initializeTable = function (table) {
  csv({checkType: true})
    .fromFile("./data/" + table + ".csv")
    .then((jsonObj) => {
      //console.log("JSON object", jsonObj, "done");
      this.data[table] = jsonObj;
    });
};

Data.prototype.initializeData = function() {
  console.log("Starting to build data tables");
  this.initializeTable(prognosisPatDataName);
  this.initializeTable(prognosisStaffDataName);
}

module.exports = Data;




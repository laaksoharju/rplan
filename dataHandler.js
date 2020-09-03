'use strict';

let csv = require("csvtojson");

let prognosisPatDataName = "prognosis_pat";
let prognosisStaffDataName = "prognosis_staff";
let outcomeStaffDataName = "outcome_staff";
let prognosisRoomsDataName = "prognosis_rooms";
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

Data.prototype.getOutcomeStaff = function () {
  var d = this.data;
  return d[outcomeStaffDataName]
}

Data.prototype.getPrognosisRooms = function () {
  var d = this.data;
  return d[prognosisRoomsDataName]
}

/*
  Function to load initial data from json files into the object
*/
Data.prototype.initializeJSONTable = function (table) {
      this.data[table] = require("./data/" + table + ".json");
};

/*
  Function to load initial data from json files into the object
*/
Data.prototype.initializeTable = function (table) {
  csv({checkType: true, quote:"'"})
    .fromFile("./data/" + table + ".csv")
    .then((jsonObj) => {
      this.data[table] = jsonObj;
    });
};

Data.prototype.initializeData = function() {
  console.log("Starting to build data tables");
  this.initializeTable(prognosisPatDataName);
  this.initializeTable(prognosisStaffDataName);
  this.initializeTable(outcomeStaffDataName);
  this.initializeJSONTable(prognosisRoomsDataName);
}

module.exports = Data;




const { TestReport } = require("../models/model");
const testReports = require("../data/test-data/testReports");
const { connect } = require("../connection");

connect();

TestReport.collection
  .drop()
  .then(() => {
    console.log("collection dropped!");
    testReports.forEach((report) => {
      const testRep = new TestReport(report);

      testRep
        .save()
        .then(() => {
          console.log("test report added");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
  .catch((err) => {
    console.log(err);
  });

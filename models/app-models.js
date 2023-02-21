const { Mushroom, Report } = require("../db/models/model");
const { mongoose } = require("mongoose");

exports.fetchMushrooms = () => {
  return Mushroom.find({}).then((mushrooms) => {
    return mushrooms;
  });
};

exports.fetchReports = () => {
  return Report.find({}).then((reports) => {
    return reports;
  });
};

exports.fetchReport = (report_id) => {
  return Report.find({ _id: report_id }).then((report) => {
    return report;
  });
};

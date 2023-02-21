const { Mushroom, Report } = require("../db/models/model");

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

exports.fetchMushroomByName = (name) => {
  return Mushroom.find({ commonName: name }).then((mushroom) => {
    if (!mushroom.length) {
      return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return mushroom;
  });
};

exports.insertReport = (report) => {
  const keys = ["location", "img_url", "username", "time_stamp", "species"];

  const greenlight = keys.every((key) => {
    return report.hasOwnProperty(key);
  });

  if (greenlight) {
    report.credibility = 0;
    report.alternate_species = [];

    const newReport = new Report(report);
    return newReport.save();
  } else {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
};

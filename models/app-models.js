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

const { Mushroom, User, Report } = require("../models/model");

const seed = ({ mushroomsData, reportsData, usersData }) => {
  return Mushroom.deleteMany({})
    .then(() => {
      return Mushroom.insertMany(mushroomsData);
    })
    .then(() => {
      return Report.deleteMany({});
    })
    .then(() => {
      return Report.insertMany(reportsData);
    })
    .then(() => {
      return User.deleteMany({});
    })
    .then(() => {
      return User.insertMany(usersData);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = seed;

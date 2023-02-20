// checks if env variable TEST is true and then sets the path for accessing the data set
require("dotenv").config();
const enviroment = process.env.TEST ? "test" : "development";
const dataPath = `../data/${enviroment}-data`;

const { Report, Mushroom, User } = require("../models/model"); // import generic models
const { reports, mushrooms, users } = require(`${dataPath}/index`); //retriving datasets depending on ENV context
const { connect } = require("../connection");

const seedData = (Model, dataArr) => {
  Model.collection
    .drop()
    .then(() => {
      console.log("collection dropped!");
      dataArr.forEach((item) => {
        const document = new Model(item);

        document
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
};

connect();

const runSeed = () => {
  // seed(model, data)
  seedData(Report, reports);
  seedData(Mushroom, mushrooms);
  seedData(User, users);
};

runSeed();

module.exports = { runSeed };

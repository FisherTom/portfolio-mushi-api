// checks if env variable TEST is true and then sets the path for accessing the data set
require("dotenv").config();
const enviroment = process.env.TEST ? "test" : "development";
const dataPath = `../data/${enviroment}-data`;

const { Report, Mushroom } = require("../models/model");
const { reports, mushrooms } = require(`${dataPath}/index`);
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

seedData(Report, reports);
seedData(Mushroom, mushrooms);

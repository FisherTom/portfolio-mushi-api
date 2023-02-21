const devData = require("../data/development-data/");
const seed = require("./seed");
const mongoose = require("mongoose");

const runSeed = () => {
  return seed(devData).then(() => {
    mongoose.connection.close();
  });
};

runSeed();

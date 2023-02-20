const mongoose = require("mongoose");
require("dotenv").config();

const ENV = process.env.TEST ? "test" : "production";
console.log(ENV);
require("dotenv").config({
  path: `../.env.${ENV}`,
});

const connect = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connect };

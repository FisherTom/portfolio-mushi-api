const mongoose = require("mongoose");
require("dotenv").config();

const enviroment = process.env.TEST ? "test" : "development";

require("custom-env").env(enviroment);

const connect = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connect };

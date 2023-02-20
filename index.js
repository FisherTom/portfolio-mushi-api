const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

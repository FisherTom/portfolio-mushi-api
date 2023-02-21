const express = require("express");
const app = express();

const {
  handleServerErrors,
  handleRouteErrors,
  handleCustomErrors,
} = require("../errors/");

const {
  getMushrooms,
  getReports,
  getMushroomByName,
} = require("../controllers/app-controllers");

app.get("/api/mushrooms", getMushrooms);

app.get("/api/mushrooms/:name", getMushroomByName);

app.get("/api/reports", getReports);

app.use(handleRouteErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;

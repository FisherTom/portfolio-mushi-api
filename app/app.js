const express = require("express");
const app = express();

const { handleServerErrors, handleRouteErrors } = require("../errors/");

const {
  getMushrooms,
  getReports,
  getReportById,
} = require("../controllers/app-controllers");

app.get("/api/mushrooms", getMushrooms);

app.get("/api/reports", getReports);

app.get("/api/reports/:report_id", getReportById);

app.use(handleRouteErrors);

app.use(handleServerErrors);

module.exports = app;

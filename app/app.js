const express = require("express");
const app = express();

app.use(express.json());

const {
  handleServerErrors,
  handleRouteErrors,
  handleCustomErrors,
} = require("../errors/");

const {
  getMushrooms,
  getReports,
  getMushroomByName,
  getReportById,
  postReport,
  patchReport,
} = require("../controllers/app-controllers");

app.get("/api/mushrooms", getMushrooms);

app.get("/api/mushrooms/:name", getMushroomByName);

app.get("/api/reports", getReports);

app.get("/api/reports/:report_id", getReportById);

app.post("/api/reports", postReport);

app.patch("/api/reports/:report_id", patchReport);

app.use(handleRouteErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;

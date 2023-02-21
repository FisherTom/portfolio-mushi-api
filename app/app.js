const express = require("express");
const app = express();

const { handleServerErrors, handleRouteErrors } = require("../errors/");

const { getMushrooms, getReports } = require("../controllers/app-controllers");

app.get("/api/mushrooms", getMushrooms);

app.get("/api/reports", getReports);

app.use(handleRouteErrors);

app.use(handleServerErrors);

module.exports = app;

const express = require("express");
const app = express();

const { handleServerErrors, handleRouteErrors } = require("../errors/");

const { getMushrooms } = require("../controllers/app-controllers");

app.get("/api/mushrooms", getMushrooms);

// app.use(handleRouteErrors);

app.use(handleServerErrors);

module.exports = app;

const express = require("express");
const app = express();

const { handleServerErrors } = require("../errors/");

const { getMushrooms } = require("../controllers/app-controllers");

app.get("/api/mushrooms", getMushrooms);

app.use(handleServerErrors);

module.exports = app;

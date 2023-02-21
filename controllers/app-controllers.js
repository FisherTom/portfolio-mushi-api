const { fetchMushrooms, fetchReports } = require("../models/app-models");

exports.getMushrooms = (request, response, next) => {
  fetchMushrooms()
    .then((mushrooms) => {
      response.status(200).send({ mushrooms });
    })
    .catch(next);
};

exports.getReports = (request, response, next) => {
  fetchReports()
    .then((reports) => {
      response.status(200).send({ reports });
    })
    .catch(next);
};

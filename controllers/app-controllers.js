const {
  fetchMushrooms,
  fetchReports,
  fetchMushroomByName,
} = require("../models/app-models");

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

exports.getMushroomByName = (request, response, next) => {
  const { name } = request.params;
  console.log(name);
  fetchMushroomByName(name)
    .then((mushrooms) => {
      response.status(200).send({ mushrooms });
    })
    .catch(next);
};

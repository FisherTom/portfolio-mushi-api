const { fetchMushrooms } = require("../models/app-models");

exports.getMushrooms = (request, response, next) => {
  fetchMushrooms()
    .then((mushrooms) => {
      response.status(200).send({ mushrooms });
    })
    .catch(next);
};

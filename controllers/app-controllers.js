const {
  fetchMushrooms,
  fetchReports,
  fetchReport,
  fetchMushroomByName,
  insertReport,
  updateReport,
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

exports.getReportById = (request, response, next) => {
  const report_id = request.params.report_id;
  fetchReport(report_id)
    .then((report) => {
      response.status(200).send({ report });
    })
    .catch(next);
};

exports.getMushroomByName = (request, response, next) => {
  const { name } = request.params;
  fetchMushroomByName(name)
    .then((mushrooms) => {
      response.status(200).send({ mushrooms });
    })
    .catch(next);
};

exports.postReport = (request, response, next) => {
  const { report } = request.body;
  insertReport(report)
    .then((report) => {
      response.status(201).send({ report });
    })
    .catch(next);
};

exports.patchReport = (request, response, next) => {
  const report_id = request.params.report_id;
  const { suggestedSpecies } = request.body;

  updateReport(report_id, suggestedSpecies)
    .then((report) => {
      response.status(201).send({ report });
    })
    .catch(next);
};

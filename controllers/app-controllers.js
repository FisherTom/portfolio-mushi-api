const {
  fetchMushrooms,
  fetchReports,
  fetchReport,
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

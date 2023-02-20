const mongoose = require("mongoose");
const { testReportSchema } = require("../schemas/schema");

const TestReport = mongoose.model("testReport", testReportSchema);

module.exports = { TestReport };

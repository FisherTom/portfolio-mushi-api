const mongoose = require("mongoose");

const testReportSchema = mongoose.Schema({
  location: Object,
  img_url: String,
  username: String,
  time_stamp: String,
  notes: String,
  species: Object,
  credibility: Number,
  alternate_species: Array,
  prevalence: Number,
});

module.exports = { testReportSchema };

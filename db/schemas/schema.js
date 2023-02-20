const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema({
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

const MushroomSchema = mongoose.Schema({
  commonName: String,
  latinName: String,
  order: String,
  genus: String,
  attributes: Object,
  habitat: String,
  months: Array,
  colors: Array,
  toxic: Boolean,
  averageHeight: Number,
});

module.exports = { ReportSchema, MushroomSchema };

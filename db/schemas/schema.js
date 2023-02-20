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

const UserSchema = mongoose.Schema({
  username: String,
  num_reports: Number,
  avatar_url: String,
});

module.exports = { ReportSchema, MushroomSchema, UserSchema };

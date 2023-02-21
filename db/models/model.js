const mongoose = require("mongoose");
const { db } = require("../connection");

const {
  ReportSchema,
  MushroomSchema,
  UserSchema,
} = require("../schemas/schema");

const Report = mongoose.model("Report", ReportSchema);
const Mushroom = mongoose.model("Mushroom", MushroomSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Report, Mushroom, User };

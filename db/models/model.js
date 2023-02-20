const mongoose = require("mongoose");
const {
  ReportSchema,
  MushroomSchema,
  UserSchema,
} = require("../schemas/schema");

const Report = mongoose.model("Report", ReportSchema);
const Mushroom = mongoose.model("Mushroom", MushroomSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Report, Mushroom, User };

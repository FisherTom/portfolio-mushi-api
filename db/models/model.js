const mongoose = require("mongoose");
const { ReportSchema, MushroomSchema } = require("../schemas/schema");

const Report = mongoose.model("Report", ReportSchema);
const Mushroom = mongoose.model("Mushroom", MushroomSchema);

module.exports = { Report, Mushroom };

const mongoose = require("mongoose");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URL not set");
}
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.createConnection();

module.exports = { db };

const mongoose = require("mongoose");
const config = require("config");
const dotenv = require("dotenv");
dotenv.config();

const db = config
  .get("mongoURI")
  .replace("${password}", process.env.MONGO_PASSWORD)
  .replace("${dbname}", process.env.MONGO_DATABASE);
//console.log(db);

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected"))
    .catch((e) => {
      console.log(e.message);
      process.exit(1);
    });
};

module.exports = connectDB;

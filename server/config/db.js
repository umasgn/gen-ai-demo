const mongoose = require("mongoose");
const colors = require("colors");
const debug = require("debug")("app:database");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    debug(
      colors.inverse.blue(
        `Connected to database: ${connect.connection.db.databaseName}`
      )
    );
  } catch (error) {
    debug(colors.inverse.red.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};

module.exports = connectDB;

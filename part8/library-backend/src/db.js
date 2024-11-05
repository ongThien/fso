const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/config");
const logger = require("./utils/logger");


const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    logger.info("CONNECTING TO MongoDB at", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    logger.info("CONNECTED TO MongoDB");
    mongoose.set("debug", true);
  } catch(error) {
    logger.error("ERROR CONNECTING TO DB", error.message);
  }
}

module.exports = connectDB;
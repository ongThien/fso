// import base
const express = require("express");
const mongoose = require("mongoose");

// import utils
const cors = require("cors");
const morgan = require("morgan");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
require("express-async-errors");

// import controllers
const blogsRouter = require("./controllers/blogs");

// connect to MongoDB
mongoose.set("strictQuery", false);
const url = config.MONGO_URI;
logger.info("connecting to", url);
mongoose
  .connect(url)
  .then((result) => logger.info("connected to", url))
  .catch((err) => logger.error("error connecting to MongoDB", err.message));

// app & middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

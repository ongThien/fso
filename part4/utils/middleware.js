const jwt = require("jsonwebtoken");
const logger = require("./logger");
const User = require("../models/user");

const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization?.split(" ")[1];
  // logger.info("EXTRACTED TOKEN:", authorization);
  if (!authorization) {
    return res.status(401).json({ error: "Must logged in..." });
  }
  req.token = authorization;
  next();
};

const userExtractor = async (req, res, next) => {
  // logger.info("DECODING TOKEN...", req.token);
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) {
    // logger.info("No token found...")
    return res.status(401).json({ error: "No token found!"});
  }
  
  // logger.info("Extracting user....");
  const user = await User.findById(decodedToken.id);
  if (user) {
    // logger.info("FOUND user:", user);
    req.user = user;
  }

  next();
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "this username is already taken" });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "JsonWebTokenError: Token invalid!" });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "TokenExpiredError: Token expired!" });
  }

  next(err);
};

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};

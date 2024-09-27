const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const loginRouter = require("express").Router();
const logger = require("../utils/logger");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: "1h" });
  logger.info("LOGINROUTER: CREATED A NEW TOKEN");
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;

const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");
const middleware = require("../utils/middleware");

usersRouter.get("/", async (req, res) => {
  const blogsRef = {
    collection: "blogs",
    opts: {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    },
  };
  const users = await User.find({}).populate(blogsRef.collection, blogsRef.opts);
  res.status(200).json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  let user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ error: "username is taken!" });
  }

  if (!password) {
    return res.status(401).json({ error: "password is required!" });
  }

  if (password.length < 3) {
    return res
      .status(401)
      .json({ error: "password must be at least 3 characters long!" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  user = new User({ username, name, passwordHash });

  const savedUser = await user.save();
  console.log("USERS COTROLLER: NEW USER CREATED!");
  
  res.status(201).json(savedUser);
});

module.exports = usersRouter;

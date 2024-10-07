const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const userRef = {
    collection: "user",
    opts: {
      username: 1,
      name: 1,
    },
  };
  const blogs = await Blog.find({}).populate(userRef.collection, userRef.opts);
  res.status(200).json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog ? res.status(200).json(blog) : res.status(404).end();
});

blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const user = req.user;
    const { title, url, author, likes } = req.body;
    const blog = {
      title,
      author,
      url,
      likes: likes ? likes : 0,
      user: user.id,
    };
    logger.info("BLOGROUTER: received new POST request");
    const savedBlog = await new Blog(blog).save();

    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    logger.info("BLOGROUTER: NEW BLOG SAVED!");
    res.status(201).json(savedBlog);
  }
);

blogsRouter.put(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken) {
      return res.status(401).json({ error: "Must log in to like this blog." });
    }
    const { id, title, url, author, likes } = req.body;
    const blog = {
      title,
      author,
      url,
      likes
    };
    const opts = { new: true };
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, opts);
    logger.info("BLOGROUTER: UPDATED BLOG WITH ID - ", id);
    const user = await User.findById(req.body.user.id);
    for (const blog of user.blogs) {
      if (blog.id === id) {
        blog = updatedBlog;
      }
    }
    await user.save();
    res.status(200).json(updatedBlog);
  }
);

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken) {
      return res.status(401).json({ error: "token invalid" });
    }

    const blogId = req.params.id;
    // logger.info("BLOGROUTER: RECEIVED DELETE REQUEST WITH ID", blogId);
    const tobeDeletedBlog = await Blog.findById(blogId);
    const user = await User.findById(decodedToken.id);
    if (tobeDeletedBlog.user.toString() !== user.id) {
      return res.status(401).json({ error: "not allowed!" });
    }

    await Blog.deleteOne(tobeDeletedBlog);
    // logger.info("DELETED BLOG: ", tobeDeletedBlog);
    user.blogs = user.blogs.filter((blog) => blog.id !== tobeDeletedBlog.id);
    await user.save();
    res.status(204).end();
  }
);

module.exports = blogsRouter;

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog ? res.status(200).json(blog) : res.status(404).end();
});

blogsRouter.post("/", async (req, res) => {
  logger.info("REQUEST BODY", req.body)
  const { title, url, author, likes } = req.body;
  const blog = {
    title,
    author,
    url,
    likes: likes ? likes : 0,
  };
  logger.info("received new POST request");
  logger.info(blog);
  const savedBlog = await new Blog(blog).save();
  logger.info("saved!");
  res.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, url, author, likes } = req.body;
  const blog = {
    title,
    author,
    url,
    likes,
  };
  const opts = { new: true };
  logger.info("received updating request on id", req.params.id);
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, opts);
  logger.info(blog);
  logger.info("updated: ", updatedBlog);
  res.status(200).json(updatedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  logger.info("received DELETE request on id", req.params.id);
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  logger.info("deleted", deletedBlog);
  res.status(204).end();
});

module.exports = blogsRouter;

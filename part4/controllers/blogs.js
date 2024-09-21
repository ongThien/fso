const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", (req, res, next) => {
  Blog.find({})
    .then((blogs) => res.status(200).json(blogs))
    .catch((err) => next(err));
});

blogsRouter.get("/:id", (req, res, next) => {
  Blog.find(req.params.id)
    .then((blog) =>
      blog ? res.status(200).json(blog) : res.status(404).end()
    )
    .catch((err) => next(err));
});

blogsRouter.post("/", (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((savedBlog) => res.status(201).json(savedBlog))
    .catch((err) => next(err));
});

blogsRouter.put("/:id", (req, res, next) => {
  const blog = req.body;
  const opts = { new: true };

  Blog.findByIdAndUpdate(req.params.id, blog, opts)
    .then((updatedBlog) => res.status(200).json(updatedBlog))
    .catch((err) => next(err));
});

blogsRouter.delete("/:id", (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => res.status(204).end())
    .catch((err) => next(err));
});

module.exports = blogsRouter;

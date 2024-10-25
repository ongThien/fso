const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");
const userExtractor = require("../utils/middleware").userExtractor;

router.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });

  response.json(blogs);
});

router.post("/", userExtractor, async (request, response) => {
  // console.log("REQUEST BODY", request.body);
  const blog = new Blog(request.body);
  // console.log("BLOG", blog);
  const user = request.user;

  if (!user) {
    return response.status(403).json({ error: "user missing" });
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  blog.likes = blog.likes || 0;
  blog.user = user;
  user.blogs = user.blogs.concat(blog._id);

  await user.save();

  const savedBlog = await blog.save();

  // handling blog comments
  const commentPromises = blog.comments.map(async (comment) => {
    const newComment = new Comment(comment);
    const savedComment = await newComment.save();
    return savedComment.id;
  });

  const commentIds = await Promise.all(commentPromises);
  savedBlog.comments = commentIds;
  await savedBlog.save();

  response.status(201).json(savedBlog);
});

router.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(204).end();
  }

  if (blog.user && user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: "user not authorized" });
  }

  await blog.deleteOne();

  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== blog._id.toString()
  );

  await user.save();

  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });
  response.json(updatedBlog);
});

router.post("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const { content } = request.body;
  
  const newComment = new Comment({ content });
  const savedComment = await newComment.save();
  
  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  blog.comments = blog.comments.concat(savedComment.id);
  const updatedBlog = await blog.save();
  const populatedBlog = await Blog.findById(updatedBlog.id)
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });

  response.status(201).json(populatedBlog);
});

module.exports = router;

const Blog = require("../models/blog");

const initData = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getNonExistingId = async () => {
  const blog = new Blog({ title: "might delete later", url: "http://fso.com" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const getAllBlogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const getABlogInDB = async () => {
  const allBlogs = await getAllBlogsInDB();
  return getRandomElement(allBlogs);
};

const getAnExistingId = async () => {
  return (await getABlog()).id;
};

module.exports = {
  initData,
  getNonExistingId,
  getAllBlogsInDB,
  getABlogInDB,
  getAnExistingId,
  getRandomElement,
};

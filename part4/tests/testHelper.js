const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

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

const defaultUser = {
  username: "ongThien",
  password: "123456",
};

const newBlog = {
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 5,
};

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

const getABlog = (blogs) => {
  const blog = getRandomElement(blogs);
  // console.log("HELPER: GET A BLOG", blog);
  return blog;
};

const getBlogByUserId = (blogs, userId) => {
  return blogs.find((b) => b.user.toString() === userId);
};

const createAPI = () => {
  return supertest(app);
};

const createNewUserForTesting = async (user) => {
  const api = createAPI();
  await api
    .post("/api/users")
    .send(user)
    .expect(201)
    .expect("Content-Type", /application\/json/);
}

const extractToken = async (user) => {
  // console.log("EXTRACTING USER TOKEN");
  // console.log("USER: ", user);
  
  const api = createAPI();
  const logInResponse = await api
    .post("/api/login")
    .set("Accept", "application/json")
    .send(user)
    .expect(200);
  return logInResponse.body.token;
};

const createAPIWithToken = async (user) => {
  // I could not set the authorization header directly
  // from the superagent returned from supertest(app) as in createAPI() above
  // so here's how we can do it
  // read here for more info: https://github.com/ladjs/supertest/issues/398
  const token = await extractToken(user);
  return supertest.agent(app).set("Authorization", `Bearer ${token}`);
};

const createSamples = async () => {
  const api = await createAPIWithToken(defaultUser);
  for (const data of initData) {
    await api
      .post("/api/blogs")
      .send(data)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  }
}

module.exports = {
  initData,
  defaultUser,
  newBlog,
  getNonExistingId,
  getAllBlogsInDB,
  getABlog,
  getBlogByUserId,
  createNewUserForTesting,
  createAPI,
  createAPIWithToken,
  createSamples,
};

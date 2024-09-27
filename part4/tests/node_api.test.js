const { describe, it, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const config = require("../utils/config");
const helper = require("./testHelper");
const logger = require("../utils/logger");

mongoose.set("strictQuery", false);
console.log("connecting to DB");
mongoose.connect(config.MONGO_URI);
console.log("connected");

describe("creating new user", () => {
  const user = helper.defaultUser;

  it("should create new user with valid data", async () => {
    const api = helper.createAPI();
    await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  it("should not create user with already taken username", async () => {
    const api = helper.createAPI();
    await api.post("/api/users").send(user).expect(400);
  });

  it("should return a jwt in response body when user log in", async () => {
    const api = helper.createAPI();
    const res = await api
      .post("/api/login")
      .set("Accept", "application/json")
      .send(user)
      .expect(200);
    assert(res.body.token);
  });
});

describe("adding new blog", () => {
  it("should success with valid data & token provided", async () => {
    const allBlogsBefore = await helper.getAllBlogsInDB();
    const newBlog = helper.newBlog;
    const api = await helper.createAPIWithToken(helper.defaultUser);
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogsAfter = await helper.getAllBlogsInDB();
    assert.strictEqual(allBlogsAfter.length, allBlogsBefore.length + 1);

    const allTitles = allBlogsAfter.map((b) => b.title);
    assert(allTitles.includes(newBlog.title));
  });

  it("should fail with status code 401 if token is not provided", async () => {
    const allBlogsBefore = await helper.getAllBlogsInDB();
    const newBlog = helper.newBlog;

    const api = helper.createAPI();
    await api.post("/api/blogs").send(newBlog).expect(401);

    const allBlogsAfter = await helper.getAllBlogsInDB();
    assert.strictEqual(allBlogsBefore.length, allBlogsAfter.length);
  });

  it("should fail with status code 400 if data is not valid", async () => {
    const allBlogsBefore = await helper.getAllBlogsInDB();
    const invalidData = {
      title: "Go To Statement Considered Harmful",
    };

    const api = await helper.createAPIWithToken(helper.defaultUser);
    await api.post("/api/blogs").send(invalidData).expect(400);

    const allBlogsAfter = await helper.getAllBlogsInDB();
    assert.strictEqual(allBlogsBefore.length, allBlogsAfter.length);
  });
});

describe("viewing blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await helper.createSamples();
    console.log("CREATED DATA SAMPLES");
  });

  it("should return the blog with the correspond id", async () => {
    const allBlogs = await helper.getAllBlogsInDB();
    const blog = helper.getABlog(allBlogs);
    const api = helper.createAPI();
    const response = await api
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const expected = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    };

    const result = {
      title: response.body.title,
      author: response.body.author,
      url: response.body.url,
      likes: response.body.likes,
    };
    
    assert.deepStrictEqual(result, expected);
  });

  it("should fail with status code 404 if id does not exist", async () => {
    const invalidId = await helper.getNonExistingId();

    const api = helper.createAPI();
    await api.get(`/api/blogs/${invalidId}`).expect(404);
  });

  it("should fail with status code 400 if id is not valid", async () => {
    const invalidId = "hehehe";

    const api = helper.createAPI();
    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("deleting a blog", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await helper.createSamples();
    console.log("CREATED DATA SAMPLES FOR DELETION!");
  });

  it("should delete the blog if id is valid with correct user who created it", async () => {
    const allBlogsBefore = await helper.getAllBlogsInDB();
    const user = await User.findOne({ username: helper.defaultUser.username });
    const toBeDeleteBlog = helper.getBlogByUserId(allBlogsBefore, user.id);

    const api = await helper.createAPIWithToken(helper.defaultUser);
    await api.delete(`/api/blogs/${toBeDeleteBlog.id}`).expect(204);

    const allBlogsAfter = await helper.getAllBlogsInDB();
    assert.strictEqual(allBlogsAfter.length, allBlogsBefore.length - 1);

    const titlesAfter = allBlogsAfter.map((b) => b.title);
    assert(!titlesAfter.includes(toBeDeleteBlog.title));
  });

  it("should not delete the blog without the permission", async () => {
    const allBlogsBefore = await helper.getAllBlogsInDB();
    const toBeDeleteBlog = helper.getABlog(allBlogsBefore);

    const user = {
      username: "hehe",
      password: "123",
    };
    await helper.createNewUserForTesting(user);

    const api = await helper.createAPIWithToken(user);
    await api.delete(`/api/blogs/${toBeDeleteBlog.id}`).expect(401);

    const allBlogsAfter = await helper.getAllBlogsInDB();
    assert.strictEqual(allBlogsAfter.length, allBlogsBefore.length);

    const titlesAfter = allBlogsAfter.map((b) => b.title);
    assert(titlesAfter.includes(toBeDeleteBlog.title));
  });
});

describe("updating a blog", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await helper.createSamples();
    console.log("CREATED DATA SAMPLES FOR UPDATING!");
  });

  it("should update the blog if id is valid with correct user who created it", async () => {
    const allBlogsBefore = await helper.getAllBlogsInDB();
    const user = await User.findOne({ username: helper.defaultUser.username });
    const blog = helper.getBlogByUserId(allBlogsBefore, user.id);
    blog.likes = blog.likes + 1;

    const api = await helper.createAPIWithToken(helper.defaultUser);
    const res = await api
      .put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(res.body.likes, blog.likes);
  });

  it("should not update the blog without permission", async () => {
    const allBlogsBefore = await helper.getAllBlogsInDB();
    const blog = helper.getABlog(allBlogsBefore);
    blog.likes = blog.likes + 1;

    const user = {
      username: "hoho",
      password: "123",
    };
    await helper.createNewUserForTesting(user);
    const api = await helper.createAPIWithToken(user);
    const res = await api.put(`/api/blogs/${blog.id}`).send(blog).expect(401);
  });
});

after(async () => {
  // clear out all data created by test
  await User.deleteMany({});
  await Blog.deleteMany({});
  // remember to close connection
  await mongoose.connection.close();
  console.log("closed connection!");
});

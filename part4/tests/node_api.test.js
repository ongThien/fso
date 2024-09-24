const { describe, it, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const config = require("../utils/config");
const helper = require("./testHelper");

mongoose.set("strictQuery", false);
console.log("connecting to DB");
mongoose.connect(config.MONGO_URI);
console.log("connected");

describe("when there are initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    console.log("cleared previous data");
    await Blog.insertMany(helper.initData);
    console.log("data prepared!");
  });

  it("should return blogs as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should successfully fetch all blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.deepStrictEqual(response.body.length, helper.initData.length);
  });

  it("should have a specific blog title within the fetched blogs", async () => {
    const blog = await helper.getABlogInDB();
    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);
    assert(titles.includes(blog.title));
  });
});

describe("adding new blog", () => {
  it("should success with valid data", async () => {
    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await helper.getAllBlogsInDB();
    assert.strictEqual(allBlogs.length, helper.initData.length + 1);

    const allTitles = allBlogs.map((b) => b.title);
    assert(allTitles.includes(newBlog.title));
  });

  it("should fail with status code 400 if data is not valid", async () => {
    const allBlogsBefore = await helper.getAllBlogsInDB();
    const invalidData = {
      title: "Go To Statement Considered Harmful",
    };

    await api.post("/api/blogs").send(invalidData).expect(400);

    const allBlogsAfter = await helper.getAllBlogsInDB();
    assert.strictEqual(allBlogsBefore.length, allBlogsAfter.length);
  });
});

describe("viewing a specific blog", () => {
  it("should return the blog with the correspond id", async () => {
    const expected = await helper.getABlogInDB();

    const response = await api
      .get(`/api/blogs/${expected.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.deepStrictEqual(response.body, expected);
  });

  it("should fail with status code 404 if id does not exist", async () => {
    const invalidId = await helper.getNonExistingId();
    await api.get(`/api/blogs/${invalidId}`).expect(404);
  });

  it("should fail with status code 400 if id is not valid", async () => {
    const invalidId = "hehehe";
    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("deleting a blog", () => {
  it("should delete the blog if id is valid", async () => {
    const allBlogsBefore = await helper.getAllBlogsInDB();
    const toBeDeleteBlog = helper.getRandomElement(allBlogsBefore);

    await api.delete(`/api/blogs/${toBeDeleteBlog.id}`).expect(204);

    const allBlogsAfter = await helper.getAllBlogsInDB();
    assert.strictEqual(allBlogsAfter.length, allBlogsBefore.length - 1);

    const titlesAfter = allBlogsAfter.map((b) => b.title);
    assert(!titlesAfter.includes(toBeDeleteBlog.title));
  });
});

describe("updating a blog", () => {
  it("should update the blog if id is valid", async () => {
    const blog = await helper.getABlogInDB();

    blog.likes = blog.likes + 1;

    const response = await api
      .put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(response.body.likes, blog.likes);
  });
});

// beforeEach(async () => {
//   await Blog.deleteMany({});
//   console.log("cleared previous data");

//   // for (let data of helper.initData) {
//   //   await new Blog(data).save();
//   // }

//   const blogsObj = helper.initData.map((data) => new Blog(data));
//   const promisedBlogs = blogsObj.map((b) => b.save());
//   await Promise.all(promisedBlogs);
//   console.log("data prepared!");
// });

// it("should return blogs list as json", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// });

// it("should return all blogs in the DB", async () => {
//   const res = await api.get("/api/blogs");
//   assert.strictEqual(res.body.length, helper.initData.length);
// });

// it("should return a specific blog within the returned blogs", async () => {
//   const res = await api.get("/api/blogs");
//   const content = res.body.map((e) => e.title);
//   assert(content.includes("Canonical string reduction"));
// });

// it("should add a valid blog successfully", async () => {
//   const newBlog = {
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//   };

//   await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .expect(201)
//     .expect("Content-Type", /application\/json/);

//   const totalBlogs = await helper.getAllBlogsInDB();
//   assert.strictEqual(totalBlogs.length, helper.initData.length + 1);

//   const titles = totalBlogs.map((b) => b.title);
//   assert(titles.includes("Go To Statement Considered Harmful"));
// });

// it("should not add an invalid blog", async () => {
//   const newBlog = {
//     likes: 5,
//   };

//   await api.post("/api/blogs").send(newBlog).expect(400);

//   const totalBlogs = await helper.getAllBlogsInDB();
//   assert.strictEqual(totalBlogs.length, helper.initData.length);
// });

// it("should return a blog by its id", async () => {
//   const allBlogs = await helper.getAllBlogsInDB();
//   const expectedBlog = allBlogs[0];
//   // console.log("expect", expectedBlog);

//   const result = await api
//     .get(`/api/blogs/${expectedBlog.id}`)
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
//   assert.deepStrictEqual(result.body, expectedBlog);
// });

// it("should be able to delete a blog by its id", async () => {
//   const allBlogs = await helper.getAllBlogsInDB();
//   const toBeDeleted = allBlogs[0];

//   await api.delete(`/api/blogs/${toBeDeleted.id}`).expect(204);

//   const currentBlogs = await helper.getAllBlogsInDB();
//   const currentTitles = currentBlogs.map((b) => b.title);

//   assert(!currentTitles.includes(toBeDeleted.title));
//   assert.strictEqual(currentBlogs.length, helper.initData.length - 1);
// });

after(async () => {
  await mongoose.connection.close();
  console.log("closed connection!");
});

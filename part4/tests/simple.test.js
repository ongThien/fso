// test solutions from exercises 4.3 - 4.7
const { describe, it, test } = require("node:test");
const assert = require("node:assert");
const testsHelper = require("../utils/testsHelper");
const data = require("../utils/testData").blogs;

describe("4.3 define a dummy function that receives an array of blog posts as a parameter and always returns the value 1", () => {
  it("should return 1", () => {
    assert.strictEqual(testsHelper.dummy(data), 1);
  });
});

describe("4.4 Total likes - the function returns the total sum of likes in all of the blog posts.", () => {
  const dummyList = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  let expected = dummyList[0].likes;

  it("should return zero when list is empty", () => {
    const result = testsHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  })

  it("should return the correct likes of the blog when list has only one blog", () => {
    const result = testsHelper.totalLikes(dummyList);
    assert.strictEqual(result, expected);
  });

  it("should return the sum of total likes when list has many blogs", () => {
    expected = data.reduce((acc, cur) => acc + cur.likes, 0);
    const result = testsHelper.totalLikes(data);
    assert.strictEqual(result, expected);
  });
});

describe("4.5* Favorite Blog - finds out which blog has the most likes.", () => {

  it("should return the blog that has the most likes", () => {
    const result = testsHelper.getFavBlog(data);
    assert.deepStrictEqual(result, testsHelper._getFavBlog(data));
  });
});

describe("4.6* Most Blogs - finds out the author who has the largest amount of blogs", () => {
  
  it("should find out who has blogged the most", () => {
    const result = testsHelper.getMostBlogs(data);
    assert.deepStrictEqual(result, testsHelper._getMostBlogs(data));
  });
});

describe("4.7* Most Likes - finds out the author who has the most likes", () => {

  it("should find out who has the most likes", () => {
    const result = testsHelper.getMostLikes(data);
    assert.deepStrictEqual(result, testsHelper._getMostLikes(data));
  });
});

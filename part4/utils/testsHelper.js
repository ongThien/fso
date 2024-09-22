// helper functions using lodash
const _ = require("lodash");

const _getFavBlog = (blogs) => _.maxBy(blogs, "likes");

const _getMostBlogs = (blogs) => {
  const authorsGroup = _.groupBy(blogs, "author");
  const authorsBlogCounts = _.map(authorsGroup, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }));
  return _.maxBy(authorsBlogCounts, "blogs");
};

const _getMostLikes = (blogs) => {
  const authorsGroup = _.groupBy(blogs, "author");
  const authorsLikesCounts = _.map(authorsGroup, (blogs, author) => ({
    author,
    likes: blogs.reduce((total, curr) => total + curr.likes, 0),
  }));
  return _.maxBy(authorsLikesCounts, "likes");
};

const dummy = (blogs) => {
  return 1;
};

// my own solution without lodash
const groupByKey = (blogs, key) => {
  // returns an object with values of keys are grouped by the specified key, such as author
  const data = {};
  blogs.forEach((blog) => {
    if (data.hasOwnProperty(blog[key])) {
      data[blog[key]].push(blog);
    } else {
      data[blog[key]] = [blog];
    }
  });

  return data;
};

const mapFn = (groupedObj) => {
  // returns an array of objects with certain properties for the tests
  const arr = [];
  for (const [author, blogs] of Object.entries(groupedObj)) {
    arr.push({
      author,
      blogs: blogs.length,
      likes: blogs.reduce((total, cur) => total + cur.likes, 0),
    });
  }
  return arr;
};

const getMaxByKey = (arr, key) => {
  // return an object with max value specified by the key
  let max = arr.reduce((prev, cur) => (cur[key] > prev[key] ? cur : prev));
  return { author: max.author, [`${key}`]: max[key] };
};

const totalLikes = (blogs) => {
  const reducer = (totalLikes, current) => totalLikes + current.likes;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const getFavBlog = (blogs) => {
  const favBlog = blogs.reduce((prev, cur) =>
    cur.likes > prev.likes ? cur : prev
  );
  return favBlog;
};

const getMostBlogs = (blogs) => {
  const authorsGroup = groupByKey(blogs, "author");
  return getMaxByKey(mapFn(authorsGroup), "blogs");
};

const getMostLikes = (blogs) => {
  const authorsGroup = groupByKey(blogs, "author");
  return getMaxByKey(mapFn(authorsGroup), "likes");
};

module.exports = {
  dummy,
  totalLikes,
  _getFavBlog,
  _getMostBlogs,
  _getMostLikes,
  getFavBlog,
  getMostBlogs,
  getMostLikes,
};

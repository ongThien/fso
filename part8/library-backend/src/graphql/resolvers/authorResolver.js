const { v4: uuidv4 } = require("uuid");
let { authors, books } = require("../../data");
const logger = require("../../utils/logger");

const bookCount = (author) =>
  books.filter((book) => book.author === author.name).length;

const addAuthor = (root, args) => {
  const newAuthor = { ...args, id: uuidv4(), bookCount: 1 };
  authors.push(newAuthor);
  logger.info("ADDED NEW AUTHOR:", newAuthor);
  return newAuthor;
};

const authorResolvers = {
  Query: {
    authorCount: () => authors.length,
    allAuthors: () => authors,
  },

  Author: {
    bookCount,
  },

  Mutation: {
    addAuthor,
  },
};

module.exports = { authorResolvers, addAuthor };

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

const editAuthor = (root, { name, setBornTo }) => {
  const authorExist = authors.find((a) => a.name === name);

  if (!authorExist) return null;
  logger.info("MODIFYING AUTHOR:", authorExist);

  authorExist.born = setBornTo;

  logger.info("SUCCESSFULLY MODIFIED AUTHOR:", authorExist);
  return authorExist;
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
    editAuthor,
  },
};

module.exports = { authorResolvers, addAuthor };

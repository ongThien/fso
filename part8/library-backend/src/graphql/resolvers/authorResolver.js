const Author = require("../../models/author");
const Book = require("../../models/book");
const logger = require("../../utils/logger");

const bookCount = async (author) => {
  return (await Book.find({ author })).length;
};

const addAuthor = async (root, { name, born }) => {
  const newAuthor = new Author({ name, born, bookCount: 1 });

  logger.info("ADDED NEW AUTHOR:", newAuthor);
  return newAuthor.save();
};

const editAuthor = async (root, { name, setBornTo }) => {
  const authorExist = await Author.findOne({ name });

  if (!authorExist) return null;

  authorExist.born = setBornTo;
  return authorExist.save();
};

const authorResolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
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

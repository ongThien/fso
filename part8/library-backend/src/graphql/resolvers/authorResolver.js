const { GraphQLError } = require("graphql");
const Author = require("../../models/author");
const Book = require("../../models/book");
const logger = require("../../utils/logger");

const getBookCount = async (author) => {
  return (await Book.find({ author })).length;
};

const addAuthor = async (root, { name, born = null }) => {
  if (name.length < 4) {
    throw new GraphQLError("Name too short, must be at least 4 characters", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: name,
      },
    });
  }

  const newAuthor = new Author({
    name,
    born,
  });

  try {
    await newAuthor.save();
    logger.info("ADDED NEW AUTHOR:", newAuthor);
  } catch (error) {
    throw new GraphQLError("Saving new author failed!", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: name,
        error,
      },
    });
  }

  return newAuthor;
};

const editAuthor = async (root, { name, setBornTo }) => {
  const authorExist = await Author.findOne({ name });

  if (!authorExist) {
    throw new GraphQLError("Author does not exists", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: name,
        error,
      },
    });
  }

  authorExist.born = setBornTo;
  try {
    await authorExist.save();
    logger.info("UPDATED AUTHOR:", authorExist);
  } catch (error) {
    throw new GraphQLError("Update author failed!", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: setBornTo,
        error,
      },
    });
  }
  return authorExist;
};

const authorResolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
  },

  Author: {
    bookCount: getBookCount,
  },

  Mutation: {
    addAuthor,
    editAuthor,
  },
};

module.exports = { authorResolvers, addAuthor };

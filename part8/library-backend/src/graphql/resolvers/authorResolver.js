const { GraphQLError } = require("graphql");
const Author = require("../../models/author");
const Book = require("../../models/book");
const logger = require("../../utils/logger");

// addAuthor was exported to handle cases when user create a new book
// where author is not exists in the DB, then a new author will be created accordingly
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

const authorResolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
  },

  Author: {
    bookCount: async (author, args, { bookCountLoader }) => {
      // this code will create n+1 problem:
      // return (await Book.find({ author })).length; <--- right here
      // when we query for authors data, eg:
      // query {
      //   allAuthors {
      //     name
      //     bookCount
      //   }
      // }
      // it will do 1 query for the all authors, eg: Author.find({})
      // then N more query for bookCount where N is the number of authors, eg: Books.find({ author })
      // to avoid this problems there are many methods like joining, eager loading, batch loading...
      // here I choose the batch loading method
      return await bookCountLoader.load(author._id);
    },
  },

  Mutation: {
    addAuthor,
    editAuthor: async (root, { name, setBornTo }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError(
          "Not authenticated to edit author, please login!"
        );
      }

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
    },
  },
};

module.exports = { authorResolvers, addAuthor };

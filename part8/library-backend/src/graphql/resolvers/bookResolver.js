const { authorResolvers } = require("./authorResolver");
const Author = require("../../models/author");
const Book = require("../../models/book");
const logger = require("../../utils/logger");
const { GraphQLError } = require("graphql");

const bookCount = async () => Book.collection.countDocuments();

const bookResolvers = {
  Query: {
    bookCount,
    allBooks: async (root, { author, genre }) => {
      const query = {};
      if (author) {
        const authorData = await Author.findOne({ name: author });
        if (authorData) query.author = authorData._id;
      }

      if (genre) query.genres = genre;

      const books = await Book.find(query).populate("author");
      return books;
    },
  },

  Mutation: {
    addBook: async (root, { author, title, published, genres }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError(
          "Not authenticated to create new book, please login!"
        );
      }

      if (title.length < 5) {
        throw new GraphQLError(
          "Title too short, must be at least 5 characters",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: title,
            },
          }
        );
      }

      const bookExist = await Book.findOne({ title });
      if (bookExist) {
        throw new GraphQLError("This title has already existed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: title,
          },
        });
      }

      // check if author exists
      let existingAuthor = await Author.findOne({ name: author });
      // if not, create a new author
      if (!existingAuthor) {
        existingAuthor = await authorResolvers.Mutation.addAuthor(root, {
          name: author,
        });
      }
      // then create the book
      const newBook = new Book({
        title,
        published,
        genres,
        author: existingAuthor._id,
      });

      // then save it
      try {
        await newBook.save();
        // populate the author field in the saved book instance
        await newBook.populate("author");
        logger.info("ADDED NEW BOOK:", newBook);
      } catch (error) {
        throw new GraphQLError("Saving new book failed!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: {
              title,
              published,
              genres,
              author: existingAuthor._id,
            },
            error,
          },
        });
      }
      return newBook;
    },
  },
};

module.exports = bookResolvers;

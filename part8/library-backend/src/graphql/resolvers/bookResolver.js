const { authorResolvers } = require("./authorResolver");
const Author = require("../../models/author");
const Book = require("../../models/book");
const logger = require("../../utils/logger");

const bookResolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const query = {};
      if (author) {
        const authorData = await Author.findOne({name: author});
        query.author = authorData ? authorData._id : null;
      }

      if (genre) {
        query.genres = genre
      }

      const books = await Book.find(query).populate("author");
      return books;
    },
  },

  Mutation: {
    addBook: async (root, { author, ...bookFields }) => {
      const existingAuthor = await Author.find({ name: author });

      if (!existingAuthor) {
        await authorResolvers.Mutation.addAuthor(root, {
          name: author,
        });
      }

      const newBook = new Book({ ...bookFields, author });
      // books.push(newBook);
      logger.info("ADDED NEW BOOK:", newBook);
      return newBook.save();
    },
  },
};

module.exports = bookResolvers;

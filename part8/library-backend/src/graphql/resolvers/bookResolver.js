const { v4: uuidv4 } = require("uuid");
let { books, authors } = require("../../data");
const { authorResolvers } = require("./authorResolver");
const logger = require("../../utils/logger");

const bookResolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) return books;

      if (!args.genre)
        return books.filter((book) => book.author === args.author);

      const booksOfGenre = books.filter((book) =>
        book.genres.includes(args.genre)
      );

      if (!args.author) return booksOfGenre;

      return booksOfGenre.filter((book) => book.author === args.author);
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const { author, ...bookFields } = args;
      const existingAuthor = authors.find((a) => a.name === author);

      if (!existingAuthor) {
        await authorResolvers.Mutation.addAuthor(root, {
          name: author,
        });
      }

      const newBook = { ...bookFields, author, id: uuidv4() };
      books.push(newBook);
      logger.info("ADDED NEW BOOK:", newBook);
      return newBook;
    },
  },
};

module.exports = bookResolvers;

const { books } = require("../../data");

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
};

module.exports = bookResolvers;

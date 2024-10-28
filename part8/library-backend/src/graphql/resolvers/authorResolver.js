const { authors, books } = require("../../data");

const authorResolvers = {
  Query: {
    authorCount: () => authors.length,
    allAuthors: () => authors,
  },

  Author: {
    bookCount: (author) =>
      books.filter((book) => book.author === author.name).length,
  },
};
module.exports = authorResolvers;

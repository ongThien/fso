const { ApolloServer } = require("@apollo/server");
const { books, authors } = require("./data");

const typeDefs = `
  type Person {
    name: String!
    id: ID!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = server;

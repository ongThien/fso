const { gql } = require("graphql-tag");

const bookTypeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]
  }
`;

module.exports = bookTypeDefs;


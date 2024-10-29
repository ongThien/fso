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

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book 
  }
`;

module.exports = bookTypeDefs;


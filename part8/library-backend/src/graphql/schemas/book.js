const { gql } = require("graphql-tag");

const bookTypeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
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

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = bookTypeDefs;


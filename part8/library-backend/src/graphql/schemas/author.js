const { gql } = require("graphql-tag");

const authorTypeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]
  }

  type Mutation {
    addAuthor(
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
    ): Author
  }
`;

module.exports = authorTypeDefs;

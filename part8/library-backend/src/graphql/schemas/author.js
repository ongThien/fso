const { gql } = require("graphql-tag");

const authorTypeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }
`;

module.exports = authorTypeDefs;

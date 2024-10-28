const { mergeTypeDefs } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const authorTypeDefs = require("./schemas/author");
const bookTypeDefs = require("./schemas/book");
const authorResolvers = require("./resolvers/authorResolver");
const bookResolvers = require("./resolvers/bookResolver");

const typeDefs = mergeTypeDefs([authorTypeDefs, bookTypeDefs]);
const resolvers = [authorResolvers, bookResolvers];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;

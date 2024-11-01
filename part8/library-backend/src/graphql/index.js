const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const authorTypeDefs = require("./schemas/author");
const bookTypeDefs = require("./schemas/book");
const userTypeDefs = require("./schemas/user");
const { authorResolvers } = require("./resolvers/authorResolver");
const bookResolvers = require("./resolvers/bookResolver");
const userResolvers = require("./resolvers/userResolver");

const typeDefs = mergeTypeDefs([authorTypeDefs, bookTypeDefs, userTypeDefs]);
const resolvers = mergeResolvers([authorResolvers, bookResolvers, userResolvers]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;

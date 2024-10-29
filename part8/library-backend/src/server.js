const { ApolloServer } = require("@apollo/server");
const schema = require("./graphql/index");
const authorResolvers = require("./graphql/resolvers/authorResolver");

const server = new ApolloServer({
  schema,
});

module.exports = server;

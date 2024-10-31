const { ApolloServer } = require("@apollo/server");
const schema = require("./graphql/index");

const server = new ApolloServer({
  schema,
});

module.exports = server;

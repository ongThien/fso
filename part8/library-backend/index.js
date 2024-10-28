const { startStandaloneServer } = require("@apollo/server/standalone");
const server = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

startStandaloneServer(server, {
  listen: { port: config.PORT },
}).then(({ url }) => {
  logger.info(`Server ready at ${url}`);
});

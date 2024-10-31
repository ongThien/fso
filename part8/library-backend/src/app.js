const { startStandaloneServer } = require("@apollo/server/standalone");
const server = require("./server");
const { PORT } = require("./config/config");
const logger = require("./utils/logger");
const connectDB = require("./db");

const startServer = async () => {
  try {
    
    // connect to mongoDB
    await connectDB();

    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(PORT) },
    });

    logger.info(`Server ready at ${url}`);
  } catch (error) {
    logger.error("SOMETHING WENT WRONG", error);
  }
}

startServer();
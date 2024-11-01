const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");
const server = require("./server");
const User = require("./models/user");
const connectDB = require("./db");
const { PORT, JWT_SECRET } = require("./config/config");
const logger = require("./utils/logger");

const startServer = async () => {
  try {
    // connect to mongoDB
    await connectDB();

    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(PORT) },
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        
        if (auth && auth.startsWith("Bearer ")) {
          const [_, token] = auth.split(" ");
          const decodedToken = jwt.verify(token, JWT_SECRET);

          const currentUser = await User.findById(decodedToken.id);
          // logger.info("USER", currentUser)
          return { currentUser };
        }
      },
    });

    logger.info(`Server ready at ${url}`);
  } catch (error) {
    logger.error("SOMETHING WENT WRONG", error);
  }
};

startServer();

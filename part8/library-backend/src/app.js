const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const cors = require("cors");
const http = require("http");
const jwt = require("jsonwebtoken");
const schema = require("./graphql/index");
const User = require("./models/user");
const connectDB = require("./db");
const { PORT, JWT_SECRET } = require("./config/config");
const logger = require("./utils/logger");

const startServer = async () => {
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;

        if (auth && auth.startsWith("Bearer ")) {
          const [_, token] = auth.split(" ");
          const decodedToken = jwt.verify(token, JWT_SECRET);

          const currentUser = await User.findById(decodedToken.id);
          // logger.info("USER", currentUser)
          return { currentUser };
        }
      },
    })
  );

  httpServer.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();

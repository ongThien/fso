const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const jwt = require("jsonwebtoken");
const schema = require("./graphql/index");
const User = require("./models/user");
const connectDB = require("./db");
const { PORT, JWT_SECRET } = require("./config/config");
const { userLoader, bookCountLoader } = require("../src/utils/dataLoader");
const logger = require("./utils/logger");

// From https://www.apollographql.com/docs/apollo-server/data/subscriptions :
// Subscriptions are not supported by Apollo Server 4's startStandaloneServer function.
// To enable subscriptions, you must first swap to using the expressMiddleware function
// https://www.apollographql.com/docs/apollo-server/api/express-middleware
// (or any other Apollo Server integration package that supports subscriptions).

const startServer = async () => {
  await connectDB();

  const app = express();
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;

        let currentUser = null;
        if (auth && auth.startsWith("Bearer ")) {
          const [_, token] = auth.split(" ");
          const decodedToken = jwt.verify(token, JWT_SECRET);
          // logger.info("DECODED TOKEN", decodedToken)
          currentUser = await userLoader.load(decodedToken.username);
          // logger.info("USER", currentUser)
        }

        return { currentUser, bookCountLoader };
      },
    })
  );

  // by using httpServer.listen() instead of app.listen() like standard express app
  // the server starts listening on the HTTP and WebSocket transports simultaneously.
  httpServer.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();

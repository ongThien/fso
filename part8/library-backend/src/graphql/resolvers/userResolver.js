const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { JWT_SECRET } = require("../../config/config");

const userResolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    createUser: async (root, { username }) => {
      if (username.length < 3) {
        throw new GraphQLError(
          "username too short, must be at least 3 character",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: username,
            },
          }
        );
      }

      const user = new User({ username });

      return user.save().catch((error) => {
        throw new GraphQLError("Saving user failed!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: username,
            error,
          },
        });
      });
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== "secret") {
        throw new GraphQLError("Wrong credentials!", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { username, password },
          },
        });
      }

      const userForToken = {
        username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

module.exports = userResolvers;

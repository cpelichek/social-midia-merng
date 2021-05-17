// Dependency imports
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// Relative/local imports
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

// Apollo uses Express behind the scenes
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // We are destructuring the data from the request object and forwarding it to the context, so now we can access the request body from the context. That way we can use it on, let's say, our user authentication by validating the user's token.
  context: ({ req }) => ({ req }),
});

// We need to connect with the database before we start our server
// that's where mongoose comes in
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 5000 });
  });

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at ${res.url}`);
});

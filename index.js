// Dependency imports
const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

// Relative imports
const typeDefs = require("./graphql/typeDefs");
const Post = require("./models/Post");
const { MONGODB } = require("./config.js");

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

// Apollo uses Express behind the scenes
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// We need to connect we the database before we start our server
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

const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello World!",
  },
};

// Apollo uses Express behind the scenes
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// We need to connect we the database before we start our server
// that's where mongoose comes in
mongoose.connect();

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at ${res.url}`);
});

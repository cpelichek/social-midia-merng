const User = require("../../models/User");

module.exports = {
  Mutation: {
    register(_, args, context, info) {
      // TODO: Validate user data
      // TODO: Make sure user doesn't already exist
      // TODO: hash password and create an auth token
    },
  },
};
// Sometimes we will have multiple resolvers and will want to know the result of the last step before the one we are at - so data goes from one resolver them goes to the other, and them the next one, getting processed in different ways and then returned to the user. In that case we would pass "parent" argument before "args". But because in our case we don't have any resolver before this one, "parent" would be undefined, so we can pass "_" instead of "parent" - that way it doesn't take any space.
// "args" here is the arguments from the typeDefs registerInput
// "info" will have some metadata
// But what about "context"?

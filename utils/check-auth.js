const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  // The context will have an object, and inside that object we'll have our headers, something like this:
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // a convention when working with authorization tokens is to send this header with a value of: Bearer ....
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error("Authorization header must be provided");
};

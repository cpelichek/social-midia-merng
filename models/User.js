// We create database models to inferface with the database.
// User.js for instance holds the schema for our users.
// Note that MongoDB is schema-less, but we can specify a schema to have more safety when working with our server code.

const { model, Schema } = require("mongoose");
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});
// We will handle required data on the GraphQL layer, so we don't have to handle here in the mongoose layer. Same for the default values.

module.exports = model("User", userSchema);

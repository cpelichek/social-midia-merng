const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const likesResolvers = require("./likes");
const commentsResolvers = require("./comments");

module.exports = {
  // modifiers: if we have a name of the type (in this instance Post), and do stuff to change any of the fields, each time any query, mutation or subscription returns this type (Post), it will go through this modifier and apply these modifications
  Post: {
    likeCount(parent) {
      // console.log(parent);
      return parent.likes.length;
    },
    commentCount: (parent) => parent.comments.length,
  },
  Comment: {
    likeCount: (parent) => parent.likes.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};

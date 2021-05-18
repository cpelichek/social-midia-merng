const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        // mongoose turns our data models into normal js objects
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },

    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          const commentIndex = post.comments.findIndex(
            (comment) => comment.id === commentId
          );

          if (post.comments[commentIndex].username === username) {
            // splice is, among other things, the correct way to "delete" a "key-value" pair from an array without leaving an empty space
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            // This is just a safety net, since we'll never show a delete button on a comment that's not owned by that user (it'll, however, prevent a user from trying to delete a comment that's not theirs with some sort of code)
            throw new AuthenticationError("Action not allowed");
          }
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

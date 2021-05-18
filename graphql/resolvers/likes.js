const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    // toggle like on posts and comments
    async likePost(_, { postId, commentId }, context) {
      const { username } = await checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        if (commentId) {
          const commentIndex = post.comments.findIndex(
            (comment) => comment.id === commentId
          );

          if (
            post.comments[commentIndex].likes.find(
              (like) => like.username === username
            )
          ) {
            // Comment already liked by this user: unlike it
            post.comments[commentIndex].likes = post.comments[
              commentIndex
            ].likes.filter((like) => like.username !== username);
          } else {
            // Comment not liked by this user: like it
            post.comments[commentIndex].likes.push({
              username,
              createdAt: new Date().toISOString(),
            });
          }
        } else {
          if (post.likes.find((like) => like.username === username)) {
            // Post already liked by this user: unlike it
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
          } else {
            // Post not liked by this user: like it
            post.likes.push({
              username,
              createdAt: new Date().toISOString(),
            });
          }
        }
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};

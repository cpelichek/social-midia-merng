const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        // We chain .sort({ createdAt: -1 }) so our last post appears first
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      // Since we are using our own helper function, checkAuth, to validate the header and token, that means we don't need to use try-catch or throw any errors bellow
      const user = checkAuth(context);

      // We can verify that this is working correctly with a simple console.log
      console.log(user);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
  },
};

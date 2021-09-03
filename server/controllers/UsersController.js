const { getUserPosts } = require('../database/queries/PostsQueries');

const user = (req, res) => {
  res.json(req.user);
};

const posts = (req, res) => {
  const { userId } = req.params;

  getUserPosts(userId)
    .then((data) => data.rows)
    .then((data) => res.json(data))
    .catch(() => {
      res.status(500).json(
        {
          msg: 'Internal Server Error',
          status: 500,
        },
      );
    });
};

module.exports = {
  user,
  posts,
};

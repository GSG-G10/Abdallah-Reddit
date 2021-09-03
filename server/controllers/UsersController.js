const { getUserPosts, getUserVotes } = require('../database/queries/PostsQueries');

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

const votes = (req, res) => {
  const userId = req.user.id;

  getUserVotes(userId)
    .then((data) => data.rows)
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
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
  votes,
};

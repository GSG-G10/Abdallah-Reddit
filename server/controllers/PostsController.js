const {
  getPostsQuery, addPostQuery, deletePostQuery, likePostQuery,
} = require('../database/queries/PostsQueries');

const index = (req, res) => {
  getPostsQuery()
    .then((data) => {
      res.json(data.rows);
    })
    .catch();
};

const store = (req, res) => {
  // const { id } = req.user;
  const userId = 1;

  const { title, body, createdAt } = req.body;

  // server validation

  addPostQuery({
    title, body, userId, createdAt,
  })
    .then((data) => {
      res.json(data.rows[0]);
    })
    .catch();
};

const like = (req, res) => {
  const postId = req.params;

  likePostQuery(postId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const destroy = (req, res) => {
  const postId = req.params;

  deletePostQuery(postId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  index,
  store,
  destroy,
  like,
};

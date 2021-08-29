const { getCommentsQuery, addCommentQuery, likeCommentQuery } = require('../database/queries/CommentsQueries');

const index = (req, res) => {
  const { postId } = req.params;

  getCommentsQuery(postId)
    .then((data) => data.rows)
    .then((comments) => {
      res.json(comments);
    })
    // handle error
    .catch();
};

const store = (req, res) => {
  const { body, postId, createdAt } = req.body;
  // const userId = req.user.id;
  const userId = 1;

  // validation

  addCommentQuery({
    body, userId, postId, createdAt,
  })
    .then((data) => data.rows[0])
    .then((comment) => res.json(comment))
    // handel error
    .catch();
};

const like = (req, res) => {
  const { postId } = req.params;

  likeCommentQuery(postId)
    .then((data) => data.rows[0])
    .then((comment) => res.json(comment))
    // handel error
    .catch();
};

module.exports = {
  index,
  store,
  like,
};

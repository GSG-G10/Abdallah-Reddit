const { getCommentsQuery, addCommentQuery, likeCommentQuery } = require('../database/queries/CommentsQueries');
const commentSchema = require('../schemas/addCommentSchema');

const index = (req, res) => {
  const { postId } = req.params;

  getCommentsQuery(postId)
    .then((data) => data.rows)
    .then((comments) => {
      res.json(comments);
    })
    .catch(() => {
      res.status(500).json(
        {
          msg: 'Internal Server Error',
          status: 500,
        },
      );
    });
};

const store = (req, res) => {
  const { body, postId, createdAt } = req.body;
  const userId = req.user.id;

  // validation
  commentSchema.validateAsync({ body, postId, createdAt })
    .then(() => addCommentQuery({
      body, userId, postId, createdAt,
    }))
    .then((data) => data.rows[0])
    .then((comment) => res.json({
      status: 200,
      comment,
      msg: 'comment save successfully',
    }))
    .catch((err) => {
      if (err.details) {
        res.status(422).json({
          msg: err.details[0].message,
          status: 422,
        });
      } else {
        res.status(500).json(
          {
            msg: 'Internal Server Error',
            status: 500,
          },
        );
      }
    });
};

const like = (req, res) => {
  const { postId } = req.params;

  likeCommentQuery(postId)
    .then((data) => data.rows[0])
    .then((comment) => {
      if (comment) {
        res.json(comment);
      } else {
        res.status(404).json({
          msg: 'post not found !',
          status: 404,
        });
      }
    })
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
  index,
  store,
  like,
};

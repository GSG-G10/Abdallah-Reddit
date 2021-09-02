const {
  getPostsQuery, addPostQuery, deletePostQuery, likePostQuery,
} = require('../database/queries/PostsQueries');

const postSchema = require('../schemas/addPostSchema');

const index = (req, res) => {
  getPostsQuery()
    .then((data) => {
      res.json(data.rows);
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
  const userId = req.user.id;

  const {
    title, body, createdAt, image,
  } = req.body;

  // validate post
  postSchema.validateAsync({
    title, body, createdAt, image,
  })
    .catch((err) => {
      // validation error
      res.status(422).json({
        msg: err.details[0].message,
        status: 422,
      });
    })
    // add post query
    .then(() => addPostQuery({
      title, body, userId, createdAt, image,
    }))
    .then((data) => {
      res.json({
        data: data.rows[0],
        msg: 'post created successfully !',
        status: 200,
      });
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

const like = (req, res) => {
  const postId = req.params;

  likePostQuery(postId)
    .then((data) => {
      if (data.rows[0]) {
        res.json({
          data: data.rows[0],
          msg: 'like sent successfully !',
          status: 200,
        });
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

const destroy = (req, res) => {
  const postId = req.params;

  deletePostQuery(postId)
    .then((data) => {
      if (data.rows[0]) {
        res.json({
          data: data.rows[0],
          msg: 'post deleted successfully !',
          status: 200,
        });
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
  destroy,
  like,
};

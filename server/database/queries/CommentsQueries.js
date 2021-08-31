const connection = require('../config/connection');

const getCommentsQuery = (postId) => connection.query(
  `SELECT c.id, c.body, c.likes, c.created_at, u.name, u.username 
    FROM
     comments c 
     INNER JOIN users u 
     ON c.user_id = u.id 
     WHERE c.post_id = $1`,
  [postId],
);

const addCommentQuery = ({
  body, userId, postId, createdAt,
}) => connection.query(
  'INSERT INTO comments (body, user_id, post_id, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
  [body, userId, postId, createdAt],
);

const likeCommentQuery = (commentId) => connection.query(
  'UPDATE comments SET likes = likes + 1 WHERE id = $1 RETURNING *',
  [commentId],
);

module.exports = {
  getCommentsQuery,
  addCommentQuery,
  likeCommentQuery,
};

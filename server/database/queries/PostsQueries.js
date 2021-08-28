const connection = require('../config/connection');

const getPostsQuery = () => connection.query(
  'SELECT p.title, p.body, p.created_at, u.name, u.username FROM posts p INNER JOIN users u ON u.id = p.user_id ORDER BY p.likes DESC',
);

const addPostQuery = ({
  title, body, userId, createdAt,
}) => connection.query(
  'INSERT INTO posts (title, body, user_id, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
  [title, body, userId, createdAt],
);

const likePostQuery = (postId) => connection.query(
  'UPDATE posts SET likes = likes + 1 WHERE id = $1',
  [postId],
);

const deletePostQuery = (postId) => connection.query(
  'DELETE FROM posts WHERE id = $1',
  [postId],
);

module.exports = {
  getPostsQuery,
  addPostQuery,
  deletePostQuery,
  likePostQuery,
};

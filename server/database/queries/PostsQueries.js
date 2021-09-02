const connection = require('../config/connection');

const getPostsQuery = () => connection.query(
  'SELECT p.id, p.title, p.body, p.likes, p.created_at, u.name, u.username FROM posts p INNER JOIN users u ON u.id = p.user_id ORDER BY p.likes DESC',
);

const addPostQuery = ({
  title, body, userId, createdAt, image,
}) => connection.query(
  'INSERT INTO posts (title, body, user_id, created_at, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  [title, body, userId, createdAt, image],
);

const likePostQuery = (postId) => connection.query(
  'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
  [postId],
);

const deletePostQuery = (postId) => connection.query(
  'DELETE FROM posts WHERE id = $1 RETURNING *',
  [postId],
);

module.exports = {
  getPostsQuery,
  addPostQuery,
  deletePostQuery,
  likePostQuery,
};

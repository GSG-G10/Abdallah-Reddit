const connection = require('../config/connection');

const getPostsQuery = () => connection('SELECT * FROM posts ORDER BY likes');

const addPostQuery = ({
  title, body, userId, createdAt,
}) => connection.query(
  'INSERT INTO posts (title, body, user_id, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
  [title, body, userId, createdAt],
);

const deletePostQuery = (postId) => connection.query(
  'DELETE FROM posts WHERE id = $1',
  [postId],
);

module.exports = {
  getPostsQuery,
  addPostQuery,
  deletePostQuery,
};

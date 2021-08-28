const connection = require('../config/connection');

const loginQuery = (username) => connection.query('SELECT * FROM users WHERE username = $1', [username]);

const signUpQuery = ({
  name, username, email, password,
}) => connection.query(
  'INSERT INTO users (name, username,email ,password) VALUES ($1, $2, $3, $4)',
  [name, username, email, password],
);

module.exports = {
  loginQuery,
  signUpQuery,
};

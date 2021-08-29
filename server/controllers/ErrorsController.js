/* eslint-disable no-unused-vars */
const { join } = require('path');

const notFound = (req, res, next) => {
  res.sendFile(join(__dirname, '..', '..', 'public', '404.html'));
};

const serverError = (err, req, res, next) => {
  res.sendFile(join(__dirname, '..', '..', 'public', '500.html'));
};

module.exports = {
  notFound,
  serverError,
};

const { join } = require('path');

const profile = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'profile.html'));
};

const post = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'post.html'));
};

module.exports = {
  profile,
  post,
};

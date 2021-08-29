const isNotAuth = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (accessToken) {
    res.redirect('/');
  }

  next();
};

module.exports = isNotAuth;

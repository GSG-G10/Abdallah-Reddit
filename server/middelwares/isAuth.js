const { verify } = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (accessToken) {
    verify(accessToken, process.env.SECRET, (err, user) => {
      if (err) {
        req.removeCookie('accessToken');
        res.redirect('/login');
      }

      req.user = user;
      next();
    });
  } else {
    res.redirect('/login');
  }
};

module.exports = isAuth;

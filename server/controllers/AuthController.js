const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { loginQuery, signUpQuery } = require('../database/queries/AuthQueries');

const logIn = (req, res) => {
  const { username, password } = req.body;

  // validation

  loginQuery(username)
    .then((data) => data.rows[0])
    .then((user) => {
      compare(password, user.password, (error, result) => {
        if (error) {
          // show error
        }

        if (!result) {
          res.status(401).json({ msg: 'Your Credintals does not match our records' });
        } else {
          sign(
            {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
            },
            process.env.SECRET,
            (err, token) => {
              if (err) {
                // show error
              }

              res.cookie('accessToken', token).redirect('/');
            },
          );
        }
      });
    })
    // handel catch
    .catch();
};

const signUp = (req, res) => {
  const {
    // eslint-disable-next-line no-unused-vars
    username, password, comfirmedPassword, email, name,
  } = req.body;

  // validation

  hash(password, 10, (error, hashedPassword) => {
    if (error) {
      // show error
    }

    signUpQuery({
      name, username, email, hashedPassword,
    })
      .then((data) => data.rows[0])
      .then((user) => {
        sign(
          {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          },
          process.env.SECRET,
          (err, token) => {
            if (err) {
              // show error
            }

            res.cookie('accessToken', token).redirect('/');
          },
        );
      })
      // catch error
      .catch();
  });
};

const logOut = (req, res) => {
  res.clearCookie('accessToken');
  res.redirect('/');
};

module.exports = {
  logIn,
  signUp,
  logOut,
};

const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { loginQuery, signUpQuery } = require('../database/queries/AuthQueries');

const signUpSchema = require('../schemas/signUpSchema');
const signInSchema = require('../schemas/signInSchema');

const logIn = (req, res) => {
  const { username, password } = req.body;

  const { error } = signInSchema.validate({ username, password });

  if (error) {
    res.status(422).json({
      msg: error.details[0].message,
      status: 422,
    });
  } else {
    loginQuery(username)
      .then((data) => data.rows[0])
      .then((user) => {
        if (!user) {
          res.status(401).json({ msg: 'Your Credintals does not match our records' });
        }

        compare(password, user.password, (err, result) => {
          if (err) {
            res.status(500).json(
              {
                msg: 'Internal Server Error',
                status: 500,
              },
            );
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
              (errr, token) => {
                if (errr) {
                  res.status(500).json(
                    {
                      msg: 'Internal Server Error',
                      status: 500,
                    },
                  );
                }

                res.cookie('accessToken', token).redirect('/');
              },
            );
          }
        });
      })
      .catch(() => {
        res.status(500).json(
          {
            msg: 'Internal Server Error',
            status: 500,
          },
        );
      });
  }
};

const signUp = (req, res) => {
  const {
    username, password, confirmedPassword, email, name,
  } = req.body;

  const { error } = signUpSchema.validate({
    username, password, confirmedPassword, email, name,
  });

  if (error) {
    // validattion error
    res.status(422).json({
      msg: error.details[0].message,
      status: 422,
    });
  } else {
    hash(password, 10, (err, hashedPassword) => {
      if (err) {
        res.status(500).json(
          {
            msg: 'Internal Server Error',
            status: 500,
          },
        );
      }

      signUpQuery({
        name, username, email, password: hashedPassword,
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
            (errr, token) => {
              if (errr) {
                res.status(500).json(
                  {
                    msg: 'Internal Server Error',
                    status: 500,
                  },
                );
              }

              res.cookie('accessToken', token).redirect('/');
            },
          );
        })
        .catch((er) => {
          if (er.code) {
            if (er.code === '23505') {
              res.status(422).json({
                msg: `${er.constraint.split('_')[1]} alerdy in use`,
                status: 422,
              });
            }
          } else {
            res.status(500).json(
              {
                msg: er,
                status: 500,
              },
            );
          }
        });
    });
  }
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

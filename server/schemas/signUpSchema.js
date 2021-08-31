const joi = require('joi');

const signUpSchema = joi.object({
  username: joi.string().min(3).max(100).required(),
  password: joi.string().alphanum().min(8).required(),
  confirmedPassword: joi.ref('password'),
  email: joi.string().email().required(),
  name: joi.string().required(),
});

module.exports = signUpSchema;

const joi = require('joi');

const signUpSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

module.exports = signUpSchema;

const joi = require('joi');

const postSchema = joi.object({
  title: joi.string().min(5).max(100).required(),
  body: joi.string().min(5).required(),
  createdAt: joi.date(),
  image: joi.string().uri(),
});

module.exports = postSchema;

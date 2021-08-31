const joi = require('joi');

const commentSchema = joi.object({
  body: joi.string().min(3).required(),
  postId: joi.number().required(),
  createdAt: joi.date(),
});

module.exports = commentSchema;

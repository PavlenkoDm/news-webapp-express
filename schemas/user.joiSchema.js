const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const signUpSchema = Joi.object({
  name: Joi.string().required().min(4),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const refreshUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  refToken: Joi.string().required(),
});

module.exports = { signUpSchema, signInSchema, refreshUserSchema };

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
  refreshToken: Joi.string().required(),
});

const updateUserEmailShema = Joi.object({
  updatedEmail: Joi.string().pattern(emailRegexp).required(),
  currentPassword: Joi.string().required(),
});

const updateUserPasswordShema = Joi.object({
  newPassword: Joi.string().required(),
  password: Joi.string().required(),
});

const updateThemeSchema = Joi.object({
  updatedTheme: Joi.string().valid("light", "dark").required(),
});

const forgotPasswordReqSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const forgotPasswordChangeSchema = Joi.object({
  newPassword: Joi.string().required(),
});

module.exports = {
  signUpSchema,
  signInSchema,
  refreshUserSchema,
  updateUserEmailShema,
  updateUserPasswordShema,
  updateThemeSchema,
  forgotPasswordReqSchema,
  forgotPasswordChangeSchema,
};

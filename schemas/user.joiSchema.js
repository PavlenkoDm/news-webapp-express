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
  cryptoData: Joi.object()
    .keys({
      userId: Joi.string().required(),
      encryptedPassword: Joi.string().label("JOI Encrypted Password").required(),
      salt: Joi.string().label("JOI Salt").required(),
      exportedCryptoKey: Joi.string().label("JOI Exported Crypto Key").required(),
    })
    .optional(),
});

const refreshUserSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const updateUserEmailShema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
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

const socialsBind = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const googleAuthSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  sub: Joi.string().required(),
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
  socialsBind,
  googleAuthSchema,
};

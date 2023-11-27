const { createNewsSchema, updateNewsSchema, addNewsSchema } = require("./news.joiSchema");
const {
  signInSchema,
  signUpSchema,
  refreshUserSchema,
  updateUserEmailShema,
  updateUserPasswordShema,
} = require("./user.joiSchema");

module.exports = {
  createNewsSchema,
  updateNewsSchema,
  addNewsSchema,
  signInSchema,
  signUpSchema,
  refreshUserSchema,
  updateUserEmailShema,
  updateUserPasswordShema,
};

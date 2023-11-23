const { createNewsSchema, updateNewsSchema, addNewsSchema } = require("./news.joiSchema");
const {
  signInSchema,
  signUpSchema,
  refreshUserSchema,
  updateUserEmailShema,
} = require("./user.joiSchema");

module.exports = {
  createNewsSchema,
  updateNewsSchema,
  addNewsSchema,
  signInSchema,
  signUpSchema,
  refreshUserSchema,
  updateUserEmailShema,
};

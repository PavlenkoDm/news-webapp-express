const { createNewsSchema, updateNewsSchema, addNewsSchema } = require("./news.joiSchema");
const { signInSchema, signUpSchema } = require("./user.joiSchema");

module.exports = { createNewsSchema, updateNewsSchema, addNewsSchema, signInSchema, signUpSchema };

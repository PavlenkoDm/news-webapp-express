const Joi = require("joi");

const createNewsSchema = Joi.object({
  isFavourite: Joi.boolean(),
  hasRead: Joi.boolean(),
  title: Joi.string().required(),
  publishDate: Joi.string().required(),
  description: Joi.string().required(),
  edition: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  imgLink: Joi.string().required(),
  newsUrl: Joi.string().required(),
});

const addNewsSchema = Joi.array().items(
  Joi.object({
    isFavourite: Joi.boolean(),
    hasRead: Joi.boolean(),
    title: Joi.string().required(),
    publishDate: Joi.string().required(),
    description: Joi.string().required(),
    edition: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
    imgLink: Joi.string().required(),
    newsUrl: Joi.string().required(),
  })
);

const updateNewsSchema = Joi.object({
  isFavourite: Joi.boolean(),
  hasRead: Joi.boolean(),
});

module.exports = { createNewsSchema, addNewsSchema, updateNewsSchema };

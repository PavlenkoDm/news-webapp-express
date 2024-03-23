const Joi = require("joi");

const createNewsSchema = Joi.object({
  isFavourite: Joi.boolean(),
  hasRead: Joi.boolean(),
  title: Joi.string().required(),
  publishDate: Joi.string().required(),
  description: Joi.string().required(),
  editionDate: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  imgLink: Joi.string().required(),
  newsUrl: Joi.string().required(),
});

const addNewsSchema = Joi.array().items(
  Joi.object({
    isFavourite: Joi.boolean(),
    hasRead: Joi.boolean(),
    title: Joi.string().allow(""),
    publishDate: Joi.string().required(),
    description: Joi.string().allow(""),
    editionDate: Joi.string().allow(""),
    author: Joi.string().allow(""),
    category: Joi.string().allow(""),
    imgLink: Joi.string().allow(""),
    imgAlt: Joi.string().allow(""),
    newsUrl: Joi.string().required(),
    materialType: Joi.string().allow(""),
    additionDate: Joi.number().allow(null).required(),
  })
);

const updateNewsSchema = Joi.object({
  isFavourite: Joi.boolean(),
  hasRead: Joi.boolean(),
});

module.exports = { createNewsSchema, addNewsSchema, updateNewsSchema };

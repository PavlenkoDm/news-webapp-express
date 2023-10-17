const { Schema, model } = require("mongoose");

const handleMongooseError = require("../middlewares/handleMongooseError");

const newsSchema = new Schema(
  {
    isFavourite: {
      type: Boolean,
      default: false,
    },
    hasRead: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    publishDate: {
      type: String,
      required: [true, "Publish date is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    edition: {
      type: String,
      required: [true, "Edition is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    imgLink: {
      type: String,
      required: [true, "Link to image is required"],
    },
    newsUrl: {
      type: String,
      required: [true, "News url is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

newsSchema.post("save", handleMongooseError);

const News = model("new", newsSchema);

module.exports = { News };

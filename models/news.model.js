const { Schema, model } = require("mongoose");

const handleMongooseError = require("../middlewares/handleMongooseError");

const newsSchema = new Schema(
  {
    // newsOwner: {
    //   type: String,
    //   default: "",
    // },
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
      default: "",
    },
    edition: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    imgLink: {
      type: String,
      default: "",
    },
    imgAlt: {
      type: String,
      default: "",
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

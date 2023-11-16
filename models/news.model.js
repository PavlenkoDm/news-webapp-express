const { Schema, model } = require("mongoose");

const handleMongooseError = require("../middlewares/handleMongooseError");

const newsSchema = new Schema(
  {
    newsOwner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "News owner is required "],
    },
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
      default: "",
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
      default: "",
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
    materialType: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

newsSchema.post("save", handleMongooseError);

const News = model("new", newsSchema);

module.exports = { News };

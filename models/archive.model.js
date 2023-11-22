const { Schema, model } = require("mongoose");

const handleMongooseError = require("../middlewares/handleMongooseError");

const archiveSchema = new Schema(
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
    additionDate: {
      type: Number,
      required: [true, "Addition date is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

archiveSchema.post("save", handleMongooseError);

const Archive = model("archive", archiveSchema);

module.exports = { Archive };

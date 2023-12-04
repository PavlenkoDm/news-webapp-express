const { Schema, model } = require("mongoose");

const handleMongooseError = require("../middlewares/handleMongooseError");

const newsHistoryLogSchema = new Schema(
  {
    newsOwner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "News owner is required "],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    newsUrl: {
      type: String,
      required: [true, "News url is required"],
    },
    additionDate: {
      type: Number,
      default: null,
      required: false,
    },
    deletionDate: {
      type: Number,
      default: Date.now(),
    },
  },
  { versionKey: false, timestamps: true }
);

newsHistoryLogSchema.post("save", handleMongooseError);

const NewsHistoryLog = model("history", newsHistoryLogSchema);

module.exports = { NewsHistoryLog };

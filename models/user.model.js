const { Schema, model } = require("mongoose");

const handleMongooseError = require("../middlewares/handleMongooseError");

const themeList = ["Light", "Dark"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    theme: {
      type: String,
      enum: themeList,
      default: "Dark",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User };

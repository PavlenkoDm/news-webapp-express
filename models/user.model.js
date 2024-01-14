const { Schema, model } = require("mongoose");

const handleMongooseError = require("../middlewares/handleMongooseError");

const themeList = ["light", "dark"];

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
      minlength: 4,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    userTheme: {
      type: String,
      enum: themeList,
      default: "light",
    },
    accessToken: {
      type: [String],
      default: [],
    },
    haveAccounts: {
      google: {
        type: Boolean,
        default: false,
      },
      facebook: {
        type: Boolean,
        default: false,
      },
      apple: {
        type: Boolean,
        default: false,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User };

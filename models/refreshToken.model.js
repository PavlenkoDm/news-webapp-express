const { Schema, model } = require("mongoose");

const handleMongooseError = require("../middlewares/handleMongooseError");

const refreshTokenSchema = new Schema(
  {
    userEmail: {
      type: String,
      unique: true,
    },
    refreshToken: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

refreshTokenSchema.post("save", handleMongooseError);

const RefreshToken = model("refresh", refreshTokenSchema);

module.exports = { RefreshToken };

const { Schema, model } = require("mongoose");

const handleMongooseError = require("../middlewares/handleMongooseError");

const themeList = ["light", "dark"];

const arrayBufferSchemaType = {
  type: Buffer,
  get: function (data) {
    return new Uint8Array(data).buffer;
  },
  set: function (data) {
    return Buffer.from(data);
  },
};

const uint8ArraySchemaType = {
  type: Buffer,
  get: function (data) {
    return new Uint8Array(data);
  },
  set: function (uint8Array) {
    return Buffer.from(uint8Array);
  },
};

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
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      apple: {
        type: String,
        default: "",
      },
    },
    cryptoData: {
      userId: String,
      encryptedPassword: arrayBufferSchemaType,
      salt: uint8ArraySchemaType,
      exportedCryptoKey: arrayBufferSchemaType,
    },
    thirdPartyRegister: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User };

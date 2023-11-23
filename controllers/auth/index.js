const { signUpUser } = require("./signUpUser");
const { signInUser } = require("./signInUser");
const { signOutUser } = require("./signOutUser");
const { refreshUser } = require("./refreshUser");
const { getCurrentUser } = require("./getCurrentUser");
const { googleRedirect } = require("./googleRedirect");
const { updateUserEmail } = require("./updateUserEmail");

module.exports = {
  signUpUser,
  signInUser,
  signOutUser,
  refreshUser,
  googleRedirect,
  getCurrentUser,
  updateUserEmail,
};

const { signUpUser } = require("./signUpUser");
const { signInUser } = require("./signInUser");
const { signOutUser } = require("./signOutUser");
const { refreshUser } = require("./refreshUser");
const { getCurrentUser } = require("./getCurrentUser");
const { googleRedirect } = require("./googleRedirect");

module.exports = {
  signUpUser,
  signInUser,
  signOutUser,
  refreshUser,
  googleRedirect,
  getCurrentUser,
};

const { signUpUser } = require("./signUpUser");
const { signInUser } = require("./signInUser");
const { signOutUser } = require("./signOutUser");
const { refreshUser } = require("./refreshUser");
const { getCurrentUser } = require("./getCurrentUser");
const { googleRedirect } = require("./googleRedirect");
const { updateUserEmail } = require("./updateUserEmail");
const { updateUserPassword } = require("./updateUserPassword");
const { updateUserTheme } = require("./updateUserTheme");
const { forgotPasswordReq } = require("./forgotPasswordReq");
const { forgotPasswordChange } = require("./forgotPasswordChange");
const { socialsAccBind } = require("./socialsAccBind");
const { socialsAccUnbind } = require("./socialsAccUnbind");

module.exports = {
  signUpUser,
  signInUser,
  signOutUser,
  refreshUser,
  googleRedirect,
  getCurrentUser,
  updateUserEmail,
  updateUserPassword,
  updateUserTheme,
  forgotPasswordReq,
  forgotPasswordChange,
  socialsAccBind,
  socialsAccUnbind,
};

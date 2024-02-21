const transformToBool = user => {
  return {
    google: Boolean(user.haveAccounts.google),
    facebook: Boolean(user.haveAccounts.facebook),
    apple: Boolean(user.haveAccounts.apple),
  };
};

module.exports = transformToBool;

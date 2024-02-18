const { User } = require("../../models");
const { httpError, dbFailure } = require("../../helpers");

const socialsAccUnbind = async (req, res) => {
  const { _id } = req.user;
  const { socials } = req.params;

  let updatedUser;

  switch (socials) {
    case "google":
      break;
    case "facebook":
      break;
    case "apple":
      break;
    default:
      throw httpError(400, "URL param is not valid");
  }

  if (socials === "google") {
    updatedUser = await User.findByIdAndUpdate(_id, { "haveAccounts.google": "" }, { new: true });
    if (!updatedUser) {
      dbFailure();
    }
  }

  if (socials === "facebook") {
    updatedUser = await User.findByIdAndUpdate(_id, { "haveAccounts.facebook": "" }, { new: true });
    if (!updatedUser) {
      dbFailure();
    }
  }

  if (socials === "apple") {
    updatedUser = await User.findByIdAndUpdate(_id, { "haveAccounts.apple": "" }, { new: true });
    if (!updatedUser) {
      dbFailure();
    }
  }

  const haveAccounts = {
    google: Boolean(updatedUser.haveAccounts.google),
    facebook: Boolean(updatedUser.haveAccounts.facebook),
    apple: Boolean(updatedUser.haveAccounts.apple),
  };

  res.status(200);
  res.json({
    code: 200,
    message: `Account ${socials} unlinking successful`,
    haveAccounts,
  });
};

module.exports = { socialsAccUnbind };

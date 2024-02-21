const { User } = require("../../models");
const { httpError, dbFailure, transformToBool } = require("../../helpers");

const socialsAccBind = async (req, res) => {
  const { _id } = req.user;
  const { socials } = req.params;
  const { email: socialEmail } = req.body;

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
    const usedEmail = await User.findOne({
      $or: [{ email: socialEmail }, { "haveAccounts.google": socialEmail }],
    });
    if (usedEmail) {
      throw httpError(409, "Email already in use");
    }
    updatedUser = await User.findByIdAndUpdate(
      _id,
      { "haveAccounts.google": socialEmail },
      { new: true }
    );
    if (!updatedUser) {
      dbFailure();
    }
  }

  if (socials === "facebook") {
    const usedEmail = await User.findOne({
      $or: [{ email: socialEmail }, { "haveAccounts.facebook": socialEmail }],
    });
    if (usedEmail) {
      throw httpError(409, "Email already in use");
    }
    updatedUser = await User.findByIdAndUpdate(
      _id,
      { "haveAccounts.facebook": socialEmail },
      { new: true }
    );
    if (!updatedUser) {
      dbFailure();
    }
  }

  if (socials === "apple") {
    const usedEmail = await User.findOne({
      $or: [{ email: socialEmail }, { "haveAccounts.apple": socialEmail }],
    });
    if (usedEmail) {
      throw httpError(409, "Email already in use");
    }
    updatedUser = await User.findByIdAndUpdate(
      _id,
      { "haveAccounts.apple": socialEmail },
      { new: true }
    );
    if (!updatedUser) {
      dbFailure();
    }
  }

  const haveAccounts = transformToBool(updatedUser);

  res.status(200);
  res.json({
    code: 200,
    message: `Account ${socials} linking successful`,
    haveAccounts,
  });
};

module.exports = { socialsAccBind };

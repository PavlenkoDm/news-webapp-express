const { User, RefreshToken } = require("../../models");
const { httpError, dbFailure } = require("../../helpers");

const signOutUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    { $pull: { accessToken: req.token } },
    { new: true }
  );
  if (!user) {
    throw httpError(401, "User is not authorized");
  }

  const removedUserFromRefresh = await RefreshToken.findOneAndUpdate(
    { userEmail: user.email },
    { $pull: { refreshToken: req.cookies.rftoken } },
    { new: true }
  );
  if (!removedUserFromRefresh) {
    dbFailure();
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Sign-out success",
  });
};

module.exports = { signOutUser };

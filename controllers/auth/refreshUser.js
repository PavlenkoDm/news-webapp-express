const { User, RefreshToken } = require("../../models");
const {
  httpError,
  dbFailure,
  sanifyTokenCollection,
  generateAccessRefreshTokens,
} = require("../../helpers");

const refreshUser = async (req, res) => {
  const user = req.user;

  const userInRefreshToken = await RefreshToken.findOne({
    refreshToken: user.refreshToken,
  });
  if (!userInRefreshToken) {
    throw httpError(404, "Token not found");
  }

  const filteredArrOfTokens = userInRefreshToken.refreshToken.filter(
    item => item !== user.refreshToken
  );

  const { generatedAccessToken, generatedRefreshToken } = generateAccessRefreshTokens(user._id);

  const udatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $push: { accessToken: generatedAccessToken },
    },
    { new: true }
  );
  if (!udatedUser) {
    dbFailure();
  }

  await sanifyTokenCollection(udatedUser);

  filteredArrOfTokens.push(generatedRefreshToken);

  const updatedUserInRefreshToken = await RefreshToken.findOneAndUpdate(
    { userEmail: user.email },
    { refreshToken: filteredArrOfTokens },
    { new: true }
  );
  if (!updatedUserInRefreshToken) {
    dbFailure();
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Refresh user success",
    data: { accessToken: generatedAccessToken, refreshToken: generatedRefreshToken },
  });
};

module.exports = { refreshUser };

const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_SECRET_REFRESH } = process.env;

const { User, RefreshToken } = require("../../models");
const { httpError, dbFailure } = require("../../helpers");

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

  const payload = { id: user._id };
  const generatedAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  const generatedRefreshToken = jwt.sign(payload, JWT_SECRET_REFRESH, { expiresIn: "23d" });

  console.log(payload);
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

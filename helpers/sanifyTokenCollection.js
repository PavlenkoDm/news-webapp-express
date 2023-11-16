const jwt = require("jsonwebtoken");

const { User, RefreshToken } = require("../models");
const dbFailure = require("./dbFailure");

const sanifyTokenCollection = async user => {
  const currentDate = Date.now();

  if ("accessToken" in user && user.accessToken.length !== 0) {
    const validAccessTokens = user.accessToken.filter(token => {
      const decoded = jwt.decode(token);
      const expirationTime = new Date(decoded.exp * 1000);
      return expirationTime > currentDate;
    });
    const updatedUser = await User.findByIdAndUpdate(user._id, { accessToken: validAccessTokens });
    if (!updatedUser) dbFailure();
    return;
  }

  if ("refreshToken" in user && user.refreshToken.length !== 0) {
    const validRefreshTokens = user.refreshToken.filter(token => {
      const decoded = jwt.decode(token);
      const expirationTime = new Date(decoded.exp * 1000);
      return expirationTime > currentDate;
    });

    const updatedUser = await RefreshToken.findOneAndUpdate(
      { userEmail: user.userEmail },
      {
        refreshToken: validRefreshTokens,
      }
    );
    if (!updatedUser) dbFailure();
  }
};

module.exports = sanifyTokenCollection;

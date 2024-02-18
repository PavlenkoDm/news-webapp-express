const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, RefreshToken } = require("../../models");
const { httpError, dbFailure, generateAccessRefreshTokens } = require("../../helpers");

const signInUser = async (req, res) => {
  const { email, password, changePassword } = req.body;
  if (!password || !email) {
    throw httpError(400, "All sign-in fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "User is not authentified");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw httpError(401, "Password is not valid");
  }

  if (user.accessToken.length !== 0) {
    const currentDate = Date.now();
    const validAccessTokens = user.accessToken.filter(token => {
      const decoded = jwt.decode(token);
      const expirationTime = new Date(decoded.exp * 1000);
      return expirationTime > currentDate;
    });
    await User.findByIdAndUpdate(user._id, { accessToken: validAccessTokens });
  }

  const { generatedAccessToken, generatedRefreshToken } = generateAccessRefreshTokens(user._id);

  const userWithToken = await User.findByIdAndUpdate(
    user._id,
    { $push: { accessToken: generatedAccessToken } },
    { new: true }
  );
  if (!userWithToken) {
    dbFailure();
  }

  const userInRefresh = await RefreshToken.findOne({
    userEmail: userWithToken.email,
  });

  if (!userInRefresh) {
    const newUserInRefresh = await RefreshToken.create({
      userEmail: userWithToken.email,
      refreshToken: [generatedRefreshToken],
    });
    if (!newUserInRefresh) {
      dbFailure();
    }
  } else {
    const currentDate = Date.now();

    const validRefreshTokens = userInRefresh.refreshToken.filter(token => {
      const decoded = jwt.decode(token);
      const expirationTime = new Date(decoded.exp * 1000);
      return expirationTime > currentDate;
    });

    validRefreshTokens.push(generatedRefreshToken);

    await RefreshToken.findOneAndUpdate(
      { userEmail: userWithToken.email },
      { refreshToken: validRefreshTokens }
    );
  }

  const haveAccounts = {
    google: Boolean(userWithToken.haveAccounts.google),
    facebook: Boolean(userWithToken.haveAccounts.facebook),
    apple: Boolean(userWithToken.haveAccounts.apple),
  };

  const toast = changePassword ? "Password has successfully changed" : "User sign-in success";

  res.status(200);
  res.json({
    code: 200,
    message: toast,
    user: {
      id: userWithToken._id,
      name: userWithToken.name,
      email: userWithToken.email,
    },
    userTheme: userWithToken.userTheme,
    accessToken: generatedAccessToken,
    refreshToken: generatedRefreshToken,
    haveAccounts,
  });
};

module.exports = { signInUser };

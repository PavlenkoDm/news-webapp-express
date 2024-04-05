const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, RefreshToken } = require("../../models");
const { dbFailure, generateAccessRefreshTokens, transformToBool } = require("../../helpers");

const googleAuth = async (req, res) => {
  const { email, sub } = req.body;

  const existingUser = await User.findOne({ "haveAccounts.google": email });

  if (existingUser) {
    if (existingUser.accessToken.length !== 0) {
      const currentDate = Date.now();
      const validAccessTokens = existingUser.accessToken.filter(token => {
        const decoded = jwt.decode(token);
        const expirationTime = new Date(decoded.exp * 1000);
        return expirationTime > currentDate;
      });
      await User.findByIdAndUpdate(existingUser._id, {
        accessToken: validAccessTokens,
        thirdPartyRegister: true,
      });
    }

    const { generatedAccessToken, generatedRefreshToken } = generateAccessRefreshTokens(
      existingUser._id
    );

    const existingUserWithToken = await User.findByIdAndUpdate(
      existingUser._id,
      { $push: { accessToken: generatedAccessToken } },
      { new: true }
    );
    if (!existingUserWithToken) {
      dbFailure();
    }

    const existingUserInRefresh = await RefreshToken.findOne({
      userEmail: existingUserWithToken.email,
    });

    if (!existingUserInRefresh) {
      const newUserInRefresh = await RefreshToken.create({
        userEmail: existingUserWithToken.email,
        refreshToken: [generatedRefreshToken],
      });
      if (!newUserInRefresh) {
        dbFailure();
      }
    } else {
      const currentDate = Date.now();

      const validRefreshTokens = existingUserInRefresh.refreshToken.filter(token => {
        const decoded = jwt.decode(token);
        const expirationTime = new Date(decoded.exp * 1000);
        return expirationTime > currentDate;
      });

      validRefreshTokens.push(generatedRefreshToken);

      await RefreshToken.findOneAndUpdate(
        { userEmail: existingUserWithToken.email },
        { refreshToken: validRefreshTokens }
      );
    }

    const haveAccounts = transformToBool(existingUserWithToken);

    res.status(200);
    res.json({
      code: 200,
      message: "User sign-in success",
      user: {
        id: existingUserWithToken._id,
        name: existingUserWithToken.name,
        email: existingUserWithToken.email,
      },
      userTheme: existingUserWithToken.userTheme,
      accessToken: generatedAccessToken,
      refreshToken: generatedRefreshToken,
      haveAccounts,
      thirdPartyRegister: existingUserWithToken.thirdPartyRegister,
    });
  } else {
    const hashPassword = await bcrypt.hash(sub, 10);

    const userNew = await User.create({
      name: email.slice(0, email.indexOf("@")),
      email,
      password: hashPassword,
      thirdPartyRegister: true,
    });
    if (!userNew) {
      dbFailure();
    }

    const { generatedAccessToken, generatedRefreshToken } = generateAccessRefreshTokens(
      userNew._id
    );

    const userNewWithToken = await User.findByIdAndUpdate(
      userNew._id,
      { $push: { accessToken: generatedAccessToken } },
      { new: true }
    );
    if (!userNewWithToken) {
      dbFailure();
    }

    const userNewInRefresh = await RefreshToken.create({
      userEmail: userNewWithToken.email,
      refreshToken: [generatedRefreshToken],
    });
    if (!userNewInRefresh) {
      dbFailure();
    }

    const haveAccounts = transformToBool(userNewWithToken);

    res.status(200);
    res.json({
      code: 200,
      message: "User sign-up and sign-in success",
      user: {
        id: userNewWithToken._id,
        name: userNewWithToken.name,
        email: userNewWithToken.email,
      },
      userTheme: userNewWithToken.userTheme,
      accessToken: generatedAccessToken,
      refreshToken: generatedRefreshToken,
      haveAccounts,
      thirdPartyRegister: userNewWithToken.thirdPartyRegister,
    });
  }
};

module.exports = { googleAuth };

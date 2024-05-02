const bcrypt = require("bcrypt");

const { User, RefreshToken } = require("../../models");
const {
  dbFailure,
  generateAccessRefreshTokens,
  transformToBool,
  sanifyTokenCollection,
} = require("../../helpers");

const googleAuth = async (req, res) => {
  const { email, sub } = req.body;

  const existingUser = await User.findOne({ "haveAccounts.google": email });

  if (existingUser) {
    await sanifyTokenCollection(existingUser);

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
      await sanifyTokenCollection(existingUserInRefresh);

      await RefreshToken.findOneAndUpdate(
        { userEmail: existingUserWithToken.email },
        { $push: { refreshToken: generatedRefreshToken } },
        { new: true }
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
    let googleRegedUser;

    const existingGoogleRegUser = await User.findOne({ email });

    if (!existingGoogleRegUser) {
      const hashPassword = await bcrypt.hash(sub, 10);
      googleRegedUser = await User.create({
        name: email.slice(0, email.indexOf("@")),
        email,
        password: hashPassword,
        thirdPartyRegister: true,
      });
      if (!googleRegedUser) {
        dbFailure();
      }
    } else {
      googleRegedUser = existingGoogleRegUser;
      await sanifyTokenCollection(googleRegedUser);
    }

    const { generatedAccessToken, generatedRefreshToken } = generateAccessRefreshTokens(
      googleRegedUser._id
    );

    const userNewWithToken = await User.findByIdAndUpdate(
      googleRegedUser._id,
      { $push: { accessToken: generatedAccessToken } },
      { new: true }
    );
    if (!userNewWithToken) {
      dbFailure();
    }

    const existingUserInRefresh = await RefreshToken.findOne({
      userEmail: userNewWithToken.email,
    });
    if (!existingUserInRefresh) {
      const userNewInRefresh = await RefreshToken.create({
        userEmail: userNewWithToken.email,
        refreshToken: [generatedRefreshToken],
      });
      if (!userNewInRefresh) {
        dbFailure();
      }
    } else {
      await sanifyTokenCollection(existingUserInRefresh);
      await RefreshToken.findOneAndUpdate(
        { userEmail: userNewWithToken.email },
        { $push: { refreshToken: generatedRefreshToken } },
        { new: true }
      );
    }

    // const haveAccounts = transformToBool(userNewWithToken);

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
      // haveAccounts,
      thirdPartyRegister: userNewWithToken.thirdPartyRegister,
    });
  }
};

module.exports = { googleAuth };

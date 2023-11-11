const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, RefreshToken } = require("../../models");
const { httpError, dbFailure } = require("../../helpers");

const { JWT_SECRET, JWT_SECRET_REFRESH } = process.env;

const signInUser = async (req, res) => {
  const { email, password } = req.body;
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

  const payload = { id: user._id };
  const generatedAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  const generatedRefreshToken = jwt.sign(payload, JWT_SECRET_REFRESH, { expiresIn: "23d" });

  const userWithToken = await User.findByIdAndUpdate(
    user._id,
    { $push: { accessToken: generatedAccessToken } },
    { new: true }
  );
  if (!userWithToken) {
    dbFailure();
  }

  const userInRefreshTokenCollection = await RefreshToken.findOne({
    userEmail: userWithToken.email,
  });

  if (!userInRefreshTokenCollection) {
    const newUserInRefreshTokenCollection = await RefreshToken.create({
      userEmail: userWithToken.email,
      refreshToken: [generatedRefreshToken],
    });

    if (!newUserInRefreshTokenCollection) dbFailure();
  } else {
    const currentDate = Date.now();

    const validRefreshTokens = userInRefreshTokenCollection.refreshToken.filter(token => {
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

  res.status(200);
  res.json({
    code: 200,
    message: "User sign-in success",
    user: {
      name: userWithToken.name,
      email: userWithToken.email,
    },
    userTheme: userWithToken.userTheme,
    accessToken: generatedAccessToken,
    refreshToken: generatedRefreshToken,
  });
};

module.exports = { signInUser };

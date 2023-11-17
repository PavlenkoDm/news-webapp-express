const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, RefreshToken } = require("../../models");
const { httpError, dbFailure, sanifyTokenCollection } = require("../../helpers");

const { JWT_SECRET, JWT_SECRET_REFRESH } = process.env;

const googleRedirect = async (req, res) => {
  const { sub: id, name, email } = req.user._json;

  const existedUser = await User.findOne({ email: email });
  if (!existedUser) {
    const hashPassword = await bcrypt.hash(id, 10);
    const createdUser = await User.create({
      email,
      name,
      password: hashPassword,
    });
    if (!createdUser) dbFailure();
  }
  if (existedUser) {
    await sanifyTokenCollection(existedUser);
  }

  const user = await User.findOne({ email: email }, "-createdAt -updatedAt");
  if (!user) {
    throw httpError(401, "User is not authentified");
  }

  const payload = { id: user._id };
  const generatedAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  const generatedRefreshToken = jwt.sign(payload, JWT_SECRET_REFRESH, { expiresIn: "23d" });

  const userInRefresh = await RefreshToken.findOne({ userEmail: email });

  if (!userInRefresh) {
    const newUserInRefresh = await RefreshToken.create({
      userEmail: email,
      refreshToken: [generatedRefreshToken],
    });
    if (!newUserInRefresh) dbFailure();
  }

  if (userInRefresh) {
    await sanifyTokenCollection(userInRefresh);
    const updatedUserInRefresh = await RefreshToken.findOneAndUpdate(
      { userEmail: email },
      { $push: { refreshToken: generatedRefreshToken } },
      { new: true }
    );
    if (!updatedUserInRefresh) dbFailure();
  }

  const userWithAccessToken = await User.findByIdAndUpdate(
    user._id,
    { $push: { accessToken: generatedAccessToken } },
    { new: true }
  );
  if (!userWithAccessToken) dbFailure();

  res.redirect(
    `https://news-portal-refactor.vercel.app?user-id=${user._id}&name=${name}&email=${email}&access=${generatedAccessToken}&refresh=${generatedRefreshToken}`
  );
};

module.exports = { googleRedirect };

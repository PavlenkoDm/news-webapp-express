const bcrypt = require("bcrypt");

const { User, RefreshToken } = require("../../models");
const { httpError, dbFailure } = require("../../helpers");

const updateUserEmail = async (req, res) => {
  const { _id: id } = req.user;
  const { newEmail, oldPassword } = req.body;

  const user = await User.findById(id, "-createdAt -updatedAt");
  if (!user) throw httpError(404, "User not found");

  const passwordCompare = await bcrypt.compare(oldPassword, user.password);
  if (!passwordCompare) throw httpError(400, "Password incorrect");

  const updatedUser = await User.findByIdAndUpdate(id, { email: newEmail }, { new: true }).select({
    createdAt: 0,
    updatedAt: 0,
  });
  if (!updatedUser) dbFailure();

  const userInRefresh = await RefreshToken.findOneAndUpdate(
    { userEmail: user.email },
    { userEmail: newEmail },
    { new: true }
  );
  if (!userInRefresh) dbFailure();

  res.status(200);
  res.json({
    code: 200,
    message: "Email is successfully updated",
    newEmail: updatedUser.email,
  });
};

module.exports = { updateUserEmail };

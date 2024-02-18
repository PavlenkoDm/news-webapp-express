const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { dbFailure } = require("../../helpers");

const forgotPasswordChange = async (req, res, next) => {
  const { _id: id } = req.user;
  const { newPassword } = req.body;

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { password: hashedNewPassword },
    { new: true }
  ).select({
    createdAt: 0,
    updatedAt: 0,
  });
  if (!updatedUser) dbFailure();

  req.body = { email: updatedUser.email, password: newPassword, changePassword: true };

  next();
};

module.exports = { forgotPasswordChange };

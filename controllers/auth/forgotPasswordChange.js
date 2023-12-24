const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { dbFailure } = require("../../helpers");

const forgotPasswordChange = async (req, res) => {
  const { _id: id } = req.user;
  const { changedPassword } = req.body;

  const hashedNewPassword = await bcrypt.hash(changedPassword, 10);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { password: hashedNewPassword },
    { new: true }
  ).select({
    createdAt: 0,
    updatedAt: 0,
  });
  if (!updatedUser) dbFailure();

  res.status(200);
  res.json({
    code: 200,
    message: "Password changed successfully",
  });
};

module.exports = { forgotPasswordChange };

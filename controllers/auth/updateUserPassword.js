const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { httpError, dbFailure } = require("../../helpers");

const updateUserPassword = async (req, res) => {
  const { _id: id } = req.user;
  const { newPassword, password: oldPassword } = req.body;

  const user = await User.findById(id, "-createdAt -updatedAt");
  if (!user) {
    throw httpError(404, "User not found");
  }

  const passwordCompare = await bcrypt.compare(oldPassword, user.password);
  if (!passwordCompare) {
    throw httpError(400, "Password incorrect");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { password: hashedNewPassword },
    { new: true }
  ).select({
    createdAt: 0,
    updatedAt: 0,
  });
  if (!updatedUser) {
    dbFailure();
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Password is successfully updated",
  });
};

module.exports = { updateUserPassword };

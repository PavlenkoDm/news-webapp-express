const { User } = require("../../models");
const { httpError, dbFailure } = require("../../helpers");

const updateUserTheme = async (req, res) => {
  const { _id: id } = req.user;
  const { updateTheme } = req.body;

  const user = await User.findById(id, "-createdAt -updatedAt");
  if (!user) throw httpError(404, "User not found");

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { userTheme: updateTheme },
    { new: true }
  ).select({
    createdAt: 0,
    updatedAt: 0,
  });
  if (!updatedUser) dbFailure();

  res.status(200);
  res.json({
    code: 200,
    message: "Theme is successfully updated",
    userTheme: updateTheme,
  });
};

module.exports = { updateUserTheme };

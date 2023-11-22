const { User } = require("../../models");
const { httpError } = require("../../helpers");

const getCurrentUser = async (req, res) => {
  const { _id: id } = req.user;
  const user = await User.findById(id, "-createdAt -updatedAt");
  if (!user) {
    throw httpError(404, "User not found");
  }

  const { name, email, userTheme } = user;

  res.status(200);
  res.json({
    code: 200,
    message: "Get current user success",
    user: {
      id,
      name,
      email,
    },
    userTheme,
  });
};

module.exports = { getCurrentUser };

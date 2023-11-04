const { User } = require("../../models");
const { httpError } = require("../../helpers");

const signOutUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { accessToken: "" }, { new: true });
  if (!user) {
    throw httpError(401, "User is not authorized");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Sign out success",
  });
};

module.exports = { signOutUser };

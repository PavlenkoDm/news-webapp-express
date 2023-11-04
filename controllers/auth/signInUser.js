const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { httpError, dbFailure } = require("../../helpers");

const JWT_SECRET = "octopulus";

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw httpError(400, "All sign in fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "User is not authentified");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw httpError(401, "Password is not valid");
  }

  const payload = { id: user._id };
  const accessToken = jwt.sign(payload, JWT_SECRET);

  const userWithToken = await User.findByIdAndUpdate(user._id, { accessToken }, { new: true });
  if (!userWithToken) {
    dbFailure();
  }

  res.status(200);
  res.json({
    code: 200,
    message: "User sign in success",
    user: {
      name: user.name,
      email: user.email,
      theme: user.theme,
      accessToken: userWithToken.accessToken,
    },
  });
};

module.exports = { signInUser };

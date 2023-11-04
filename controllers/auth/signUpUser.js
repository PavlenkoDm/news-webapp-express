const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { httpError, dbFailure } = require("../../helpers");

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    throw httpError(400, "All sign up fields are required");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const userNew = await User.create({
    name,
    email,
    password: hashPassword,
  });
  if (!userNew) {
    dbFailure();
  }
  res.status(201);
  res.json({
    code: 201,
    message: "User registration success",
    user: {
      name: userNew.name,
      email: userNew.email,
    },
  });
};

module.exports = { signUpUser };

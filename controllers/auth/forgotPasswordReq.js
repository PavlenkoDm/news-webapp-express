const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { httpError } = require("../../helpers");
const { sendMail } = require("../../services");

const { JWT_SECRET } = process.env;

const forgotPasswordReq = async (req, res) => {
  const { recoveryEmail } = req.body;
  const userInBase = await User.findOne({ email: recoveryEmail }, "-createdAt -updatedAt");
  if (!userInBase) {
    throw httpError(404, "User not found");
  }

  const payload = { id: userInBase._id };

  const generatedToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  await sendMail(recoveryEmail, generatedToken);
  res.status(200);
  res.json({
    code: 200,
    message: "Email sent successfully",
  });
};

module.exports = { forgotPasswordReq };

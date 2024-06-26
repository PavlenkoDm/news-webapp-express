const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { httpError } = require("../../helpers");
const { sendSgEmail } = require("../../services"); /* sendMail */

const { JWT_SECRET } = process.env;

const forgotPasswordReq = async (req, res) => {
  const { email } = req.body;
  const userInBase = await User.findOne({ email }, "-createdAt -updatedAt");
  if (!userInBase) {
    throw httpError(404, "User not found");
  }

  const payload = { id: userInBase._id };

  const generatedToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  // await sendMail(email, generatedToken);
  await sendSgEmail(email, generatedToken);
  res.status(200);
  res.json({
    code: 200,
    message: "Email sent successfully",
  });
};

module.exports = { forgotPasswordReq };

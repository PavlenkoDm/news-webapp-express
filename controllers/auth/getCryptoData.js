const { User } = require("../../models");
const { httpError } = require("../../helpers");

const getCryptoData = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findOne({ userId }, "-createdAt -updatedAt");
  if (!user) {
    throw httpError(404, "User not found");
  }

  const { email, cryptoData: crData } = user;

  res.status(200);
  res.json({
    code: 200,
    message: "Your saved password has been successfully retrieved",
    cryptoData: {
      email,
      encryptedPassword: crData.encryptedPassword,
      salt: crData.salt,
    },
  });
};

module.exports = { getCryptoData };

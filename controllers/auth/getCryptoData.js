const { User } = require("../../models");
const { httpError } = require("../../helpers");

const getCryptoData = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findOne({ "cryptoData.userId": userId }, "-createdAt -updatedAt");
  if (!user) {
    throw httpError(404, "User not found");
  }

  const {
    email,
    cryptoData: { encryptedPassword, salt, exportedCryptoKey },
  } = user;

  if (!encryptedPassword || !salt || !exportedCryptoKey) {
    throw httpError(404, `Crypto data not found (userId: ${userId}), (user: ${user.email})`);
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Your saved password has been successfully retrieved",
    cryptoData: {
      email,
      encryptedPassword,
      salt,
      exportedCryptoKey,
    },
  });
};

module.exports = { getCryptoData };

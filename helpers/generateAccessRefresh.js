const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_SECRET_REFRESH } = process.env;

const generateAccessRefreshTokens = userId => {
  const payload = { id: userId };
  const generatedAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  const generatedRefreshToken = jwt.sign(payload, JWT_SECRET_REFRESH, { expiresIn: "23d" });
  return { generatedAccessToken, generatedRefreshToken };
};

module.exports = generateAccessRefreshTokens;

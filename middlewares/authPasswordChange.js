const jwt = require("jsonwebtoken");

const { httpError } = require("../helpers");
const { User } = require("../models");

const { JWT_SECRET } = process.env;

const authPasswordChange = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw httpError(401, "No Bearer");
    }

    if (!token) {
      throw httpError(401, "No token");
    }

    const { id } = jwt.verify(token, JWT_SECRET);
    if (!id) throw httpError(401, "Access token did not pass verification");

    const user = await User.findById(id);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authPasswordChange;

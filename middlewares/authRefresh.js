const jwt = require("jsonwebtoken");

const { httpError } = require("../helpers");
const { User } = require("../models");

const { JWT_SECRET_REFRESH } = process.env;

const authRefresh = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw httpError(401, "No Bearer");
    }

    if (!token) {
      throw httpError(401, "No token");
    }

    const { id } = jwt.verify(token, JWT_SECRET_REFRESH);
    if (!id) throw httpError(401, "Refresh token did not pass verification");

    const user = await User.findById(id);

    if (!user.email) {
      throw httpError(401, "Not authorized(auth middleware)");
    }

    const extendedUser = {
      _id: user._id,
      email: user.email,
      refreshToken: token,
    };

    req.user = extendedUser;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authRefresh;

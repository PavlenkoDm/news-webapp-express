const jwt = require("jsonwebtoken");

const { httpError } = require("../helpers");
const { User } = require("../models");

const JWT_SECRET = "octopulus";

const auth = async (req, res, next) => {
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
    const user = await User.findById(id);

    if (!user || !user.accessToken || user.accessToken !== token) {
      throw httpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;

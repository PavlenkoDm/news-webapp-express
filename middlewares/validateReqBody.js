const { httpError } = require("../helpers");

const validateReqBody = schema => {
  const foo = (req, res, next) => {
    // if (Object.keys(req.body).length === 0) {
    //   next();
    // }
    if (req.body.length === 0) next();
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };

  return foo;
};

module.exports = validateReqBody;

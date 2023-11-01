const { httpError } = require("../helpers");

const validateReqBody = schema => {
  const foo = (req, res, next) => {
    if (req.body.length === 0) {
      res.send("Empty arr");
      return;
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };

  return foo;
};

module.exports = validateReqBody;

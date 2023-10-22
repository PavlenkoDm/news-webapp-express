const httpError = require("./Http-error");

const dbFailure = () => {
  throw httpError(500, "Database processing is failed");
};

module.exports = dbFailure;

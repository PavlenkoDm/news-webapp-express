const validateReqBody = require("./validateReqBody");
const isValidId = require("./isValidId");
const auth = require("./auth");
const authRefresh = require("./authRefresh");
const toArchiveOldNews = require("./toArchiveOldNews");
const sanifyNewsCollection = require("./sanifyNewsCollection");

module.exports = {
  validateReqBody,
  isValidId,
  auth,
  authRefresh,
  toArchiveOldNews,
  sanifyNewsCollection,
};

const { News } = require("./news.model");
const { User } = require("./user.model");
const { RefreshToken } = require("./refreshToken.model");
const { Archive } = require("./archive.model");
const { NewsHistoryLog } = require("./newsHistoryLog.model");

module.exports = { News, User, RefreshToken, Archive, NewsHistoryLog };

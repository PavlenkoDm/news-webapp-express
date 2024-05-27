const { getAllNews } = require("./getAllNews");
const { postNews } = require("./postNews");
const { updateNews } = require("./updateNews");
const { getFavouriteNews } = require("./getFavouriteNews");
const { getHasReadNews } = require("./getHasReadNews");
const { getArchiveNews } = require("./getArchiveNews");
const { removeArchiveNews } = require("./removeArchiveNews");
const { getHistoryLog } = require("./getHistoryLog");
const { removeHistoryLog } = require("./removeHistoryLog");

module.exports = {
  getAllNews,
  postNews,
  updateNews,
  getFavouriteNews,
  getHasReadNews,
  getArchiveNews,
  removeArchiveNews,
  getHistoryLog,
  removeHistoryLog,
};

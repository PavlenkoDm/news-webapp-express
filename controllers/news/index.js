const { getAllNews } = require("./getAllNews");
const { postNews } = require("./postNews");
const { updateNews } = require("./updateNews");
const { getFavouriteNews } = require("./getFavouriteNews");
const { getHasReadNews } = require("./getHasReadNews");
const { postFavouriteNews } = require("./postFavouriteNews");
const { postHasReadNews } = require("./postHasReadNews");
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
  postFavouriteNews,
  postHasReadNews,
  getArchiveNews,
  removeArchiveNews,
  getHistoryLog,
  removeHistoryLog,
};

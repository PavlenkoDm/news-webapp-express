const { getAllNews } = require("./getAllNews");
const { postNews } = require("./postNews");
const { updateNews } = require("./updateNews");
const { getFavouriteNews } = require("./getFavouriteNews");
const { getHasReadNews } = require("./getHasReadNews");
const { postFavouriteNews } = require("./postFavouriteNews");
const { postHasReadNews } = require("./postHasReadNews");

module.exports = {
  getAllNews,
  postNews,
  updateNews,
  getFavouriteNews,
  getHasReadNews,
  postFavouriteNews,
  postHasReadNews,
};

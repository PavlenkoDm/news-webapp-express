const { dbFailure, modifyDBResponse } = require("../../helpers");
const { News } = require("../../models");

const postFavouriteNews = async (req, res) => {
  const result = await News.deleteMany({ isFavourite: true });
  if (!result) {
    dbFailure();
    return;
  }

  const postedFavouriteNews = await News.insertMany(req.body);
  if (!postedFavouriteNews) {
    dbFailure();
    return;
  }

  const modifiedPostedFavouriteNews = modifyDBResponse(postedFavouriteNews);

  res.status(201);
  res.json({
    code: 201,
    message: "Add favourite news success",
    data: modifiedPostedFavouriteNews,
  });
};

module.exports = { postFavouriteNews };

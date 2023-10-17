const { News } = require("../../models");

const getFavouriteNews = async (req, res) => {
  const data = await News.find({ isFavourite: true }, "-createdAt -updatedAt");
  res.status(200);
  res.json({
    code: 200,
    message: "Get favourite news success",
    data,
  });
};

module.exports = { getFavouriteNews };

const { dbFailure } = require("../../helpers");
const { News } = require("../../models");

const getFavouriteNews = async (req, res) => {
  const { _id: id } = req.user;
  const data = await News.find(
    { $and: [{ isFavourite: true }, { newsOwner: id }] },
    "-createdAt -updatedAt -_id -newsOwner"
  );
  if (!data) {
    dbFailure();
    return;
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Get favourite news success",
    data,
  });
};

module.exports = { getFavouriteNews };

const { dbFailure, redisGetData, redisSetData } = require("../../helpers");
const { News } = require("../../models");

const getFavouriteNews = async (req, res) => {
  const { _id: id } = req.user;

  const cachedNews = await redisGetData(`Cached favourite news ${id}`);

  if (cachedNews) {
    res.status(200);
    res.json({
      code: 200,
      message: "Get favourite news success",
      data: cachedNews,
    });
    return;
  }

  const data = await News.find(
    { $and: [{ isFavourite: true }, { newsOwner: id }] },
    "-createdAt -updatedAt -_id -newsOwner"
  );
  if (!data) {
    dbFailure();
    return;
  }

  await redisSetData(`Cached favourite news ${id}`, data);

  res.status(200);
  res.json({
    code: 200,
    message: "Get favourite news success",
    data,
  });
};

module.exports = { getFavouriteNews };

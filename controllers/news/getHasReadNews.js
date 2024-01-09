const { dbFailure, redisGetData, redisSetData } = require("../../helpers");
const { News } = require("../../models");

const getHasReadNews = async (req, res) => {
  const { _id: id } = req.user;

  const cachedNews = await redisGetData(`Cached has read news ${id}`);

  if (cachedNews) {
    res.status(200);
    res.json({
      code: 200,
      message: "Get has read news success",
      data: cachedNews,
    });
    return;
  }

  const data = await News.find(
    { $and: [{ hasRead: true }, { newsOwner: id }] },
    "-createdAt -updatedAt -_id -newsOwner"
  );
  if (!data) {
    dbFailure();
    return;
  }

  await redisSetData(`Cached has read news ${id}`, data);

  res.status(200);
  res.json({
    code: 200,
    message: "Get has read news success",
    data,
  });
};

module.exports = { getHasReadNews };

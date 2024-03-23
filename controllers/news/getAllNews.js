const { dbFailure, redisGetData, redisSetData } = require("../../helpers");
const { News } = require("../../models");

const getAllNews = async (req, res) => {
  const { _id: id } = req.user;
  // const cachedNews = await redisGetData(`Cached all news ${id}`);

  // if (cachedNews) {
  //   res.status(200);
  //   res.json({
  //     code: 200,
  //     message: "Get all news success",
  //     data: cachedNews,
  //   });
  //   return;
  // }

  const data = await News.find({ newsOwner: id }, "-createdAt -updatedAt -_id -newsOwner");
  if (!data) {
    dbFailure();
    return;
  }

  // await redisSetData(`Cached all news ${id}`, data);

  res.status(200);
  res.json({
    code: 200,
    message: "Get all news success",
    data,
  });
};

module.exports = { getAllNews };

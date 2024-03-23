const { dbFailure, redisGetData, redisSetData } = require("../../helpers");
const { Archive } = require("../../models");

const getArchiveNews = async (req, res) => {
  const { _id: id } = req.user;

  // const cachedArchiveNews = await redisGetData(`Cached archive news ${id}`);

  // if (cachedArchiveNews) {
  //   res.status(200);
  //   res.json({
  //     code: 200,
  //     message: "Get archive news success",
  //     data: cachedArchiveNews,
  //   });
  //   return;
  // }

  const data = await Archive.find({ newsOwner: id }, "-createdAt -updatedAt -newsOwner");
  if (!data) {
    dbFailure();
    return;
  }

  // await redisSetData(`Cached archive news ${id}`, data);

  res.status(200);
  res.json({
    code: 200,
    message: "Get archive news success",
    data,
  });
};

module.exports = { getArchiveNews };

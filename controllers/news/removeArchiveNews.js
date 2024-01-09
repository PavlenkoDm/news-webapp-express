const { clientRedis } = require("../../configs");
const { dbFailure, redisSetData } = require("../../helpers");
const { Archive, NewsHistoryLog } = require("../../models");

const removeArchiveNews = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;
  const response = await Archive.findByIdAndRemove(id);
  if (!response) {
    dbFailure();
    return;
  }
  const { _id, newsOwner, title, category, newsUrl, additionDate } = response;
  const newsLog = await NewsHistoryLog.create({
    newsOwner,
    title,
    category,
    newsUrl,
    additionDate,
  });
  if (!newsLog) {
    dbFailure();
    return;
  }

  const data = await Archive.find({ newsOwner: userId }, "-createdAt -updatedAt -newsOwner");
  if (!data) {
    dbFailure();
    return;
  }

  await redisSetData(`Cached archive news ${userId}`, data);

  const newsLogCache = await clientRedis.exists(`Cached news history log ${userId}`);
  if (newsLogCache) {
    const data = await NewsHistoryLog.find(
      { newsOwner: userId },
      "-createdAt -updatedAt -newsOwner"
    );
    if (!data) dbFailure();
    await redisSetData(`Cached news history log ${userId}`, data);
  }

  res.json({
    code: 200,
    message: "Remove news success",
    _id,
  });
};

module.exports = { removeArchiveNews };

const { dbFailure } = require("../../helpers");
const { Archive, NewsHistoryLog } = require("../../models");

const removeArchiveNews = async (req, res) => {
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

  res.status(200);
  res.json({
    code: 200,
    message: "Remove news success",
    _id,
  });
};

module.exports = { removeArchiveNews };

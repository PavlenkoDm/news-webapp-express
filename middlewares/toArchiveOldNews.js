const { News, Archive } = require("../models");
const { dbFailure, httpError } = require("../helpers");

const period = 86400000 * 30; // 86400000(сутки) 600000(десять минут)

const toArchiveOldNews = async (req, res, next) => {
  const { _id: id } = req.user;

  const presentDate = Date.now();

  const allNews = await News.find({ newsOwner: id }, "-createdAt -updatedAt -_id");
  if (!allNews) throw httpError(401, "Unauthorized");
  if (allNews.length === 0) {
    next();
    return;
  }

  const oldNews = allNews.filter(({ additionDate }) => presentDate - additionDate > period);
  if (oldNews.length === 0) {
    next();
    return;
  }

  for await (const news of oldNews) {
    const isInArchive = await Archive.findOne({ newsUrl: news.newsUrl });
    if (!isInArchive) {
      const {
        newsOwner,
        isFavourite,
        hasRead,
        title,
        publishDate,
        description,
        edition,
        author,
        category,
        imgLink,
        imgAlt,
        newsUrl,
        materialType,
        additionDate,
      } = news;
      const addedNews = await Archive.create({
        newsOwner,
        isFavourite,
        hasRead,
        title,
        publishDate,
        description,
        edition,
        author,
        category,
        imgLink,
        imgAlt,
        newsUrl,
        materialType,
        additionDate,
      });
      if (!addedNews) dbFailure();
    }
    const removedNews = await News.findOneAndRemove({ newsUrl: news.newsUrl });
    if (!removedNews) dbFailure();
  }

  next();
};

module.exports = toArchiveOldNews;

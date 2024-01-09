const { dbFailure, modifyDBResponse, redisSetData } = require("../../helpers");
const { News } = require("../../models");

const postNews = async (req, res) => {
  const { _id: id } = req.user;
  const result = await News.deleteMany({ newsOwner: id });
  if (!result) {
    dbFailure();
    return;
  }

  const newReqBody = req.body.map(element => {
    return { ...element, newsOwner: id };
  });

  const postedNews = await News.insertMany(newReqBody);
  if (!postedNews) {
    dbFailure();
    return;
  }

  const modifiedPostedNews = modifyDBResponse(postedNews);

  const favouriteNews = req.body.filter(({ isFavourite }) => isFavourite);
  const readNews = req.body.filter(({ hasRead }) => hasRead);

  await redisSetData(`Cached all news ${id}`, req.body);
  await redisSetData(`Cached favourite news ${id}`, favouriteNews);
  await redisSetData(`Cached has read news ${id}`, readNews);

  res.status(201);
  res.json({
    code: 201,
    message: "Add news success",
    data: modifiedPostedNews,
  });
};

module.exports = { postNews };

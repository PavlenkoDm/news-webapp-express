const { dbFailure, modifyDBResponse } = require("../../helpers");
const { News } = require("../../models");

const postHasReadNews = async (req, res) => {
  const result = await News.deleteMany({ hasRead: true });
  if (!result) {
    dbFailure();
    return;
  }

  const postedHasReadNews = await News.insertMany(req.body);
  if (!postedHasReadNews) {
    dbFailure();
    return;
  }

  const modifiedPostedHasReadNews = modifyDBResponse(postedHasReadNews);

  res.status(201);
  res.json({
    code: 201,
    message: "Add read news success",
    data: modifiedPostedHasReadNews,
  });
};

module.exports = { postHasReadNews };

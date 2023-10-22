const { dbFailure, modifyDBResponse } = require("../../helpers");
const { News } = require("../../models");

const postNews = async (req, res) => {
  const result = await News.deleteMany({});
  if (!result) {
    dbFailure();
    return;
  }

  const postedNews = await News.insertMany(req.body);
  if (!postedNews) {
    dbFailure();
    return;
  }

  const modifiedPostedNews = modifyDBResponse(postedNews);

  res.status(201);
  res.json({
    code: 201,
    message: "Add news success",
    data: modifiedPostedNews,
  });
};

module.exports = { postNews };

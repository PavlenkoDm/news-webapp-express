const { dbFailure, modifyDBResponse } = require("../../helpers");
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

  res.status(201);
  res.json({
    code: 201,
    message: "Add news success",
    data: modifiedPostedNews,
  });
};

module.exports = { postNews };

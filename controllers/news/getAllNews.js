const { News } = require("../../models");

const getAllNews = async (req, res) => {
  await News.deleteMany({ $and: [{ isFavourite: false }, { hasRead: false }] });
  const data = await News.find({}, "-createdAt -updatedAt");
  res.status(200);
  res.json({
    code: 200,
    message: "Get all news success",
    data,
  });
};

module.exports = { getAllNews };

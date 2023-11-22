const { dbFailure } = require("../../helpers");
const { News } = require("../../models");

const getAllNews = async (req, res) => {
  const { _id: id } = req.user;
  const data = await News.find({ newsOwner: id }, "-createdAt -updatedAt -_id -newsOwner");
  if (!data) {
    dbFailure();
    return;
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Get all news success",
    data,
  });
};

module.exports = { getAllNews };

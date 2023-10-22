const { dbFailure } = require("../../helpers");
const { News } = require("../../models");

const getHasReadNews = async (req, res) => {
  const data = await News.find({ hasRead: true }, "-createdAt -updatedAt -_id");
  if (!data) {
    dbFailure();
    return;
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Get has read news success",
    data,
  });
};

module.exports = { getHasReadNews };

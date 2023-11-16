const { dbFailure } = require("../../helpers");
const { News } = require("../../models");

const getHasReadNews = async (req, res) => {
  const { _id: id } = req.user;
  const data = await News.find(
    { $and: [{ hasRead: true }, { newsOwner: id }] },
    "-createdAt -updatedAt -_id -newsOwner"
  );
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

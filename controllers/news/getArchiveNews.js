const { dbFailure } = require("../../helpers");
const { Archive } = require("../../models");

const getArchiveNews = async (req, res) => {
  const { _id: id } = req.user;
  const data = await Archive.find({ newsOwner: id }, "-createdAt -updatedAt -newsOwner");
  if (!data) {
    dbFailure();
    return;
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Get archive news success",
    data,
  });
};

module.exports = { getArchiveNews };

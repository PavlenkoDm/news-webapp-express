const { dbFailure } = require("../../helpers");
const { Archive } = require("../../models");

const removeArchiveNews = async (req, res) => {
  const { id } = req.params;
  const response = await Archive.findByIdAndRemove(id);
  if (!response) {
    dbFailure();
    return;
  }
  const { title, newsUrl } = response;
  res.status(200);
  res.json({
    code: 200,
    message: "Remove news success",
    data: { title, newsUrl },
  });
};

module.exports = { removeArchiveNews };

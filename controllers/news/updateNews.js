const { httpError } = require("../../helpers");
const { News } = require("../../models");

const updateNews = async (req, res) => {
  const { id } = req.params;
  const result = await News.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select({ createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw httpError(404, "News not found");
  }

  res.status(201);
  res.json({
    code: 201,
    message: "News update success",
    data: result,
  });
};

module.exports = { updateNews };

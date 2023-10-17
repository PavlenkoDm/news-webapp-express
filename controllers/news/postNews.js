const { News } = require("../../models");

const postNews = async (req, res) => {
  const postedNews = await News.create({ ...req.body });
  res.status(201);
  res.json({
    code: 201,
    message: "Add news success",
    data: postedNews,
  });
};

module.exports = { postNews };

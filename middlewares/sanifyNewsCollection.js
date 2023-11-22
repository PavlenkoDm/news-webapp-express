const { News } = require("../models");
const { httpError } = require("../helpers");

const sanifyNewsCollection = async (req, res, next) => {
  const { _id: id } = req.user;
  const deleting = await News.deleteMany({
    $and: [{ isFavourite: false }, { hasRead: false }, { newsOwner: id }],
  });
  if (!deleting) throw httpError(401, "Unauthorized");

  next();
};

module.exports = sanifyNewsCollection;

const { dbFailure } = require("../../helpers");
const { NewsHistoryLog } = require("../../models");

const getHistoryLog = async (req, res) => {
  const { _id: id } = req.user;
  const data = await NewsHistoryLog.find({ newsOwner: id }, "-createdAt -updatedAt -newsOwner");
  if (!data) {
    dbFailure();
    return;
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Get history-log success",
    data,
  });
};

module.exports = { getHistoryLog };

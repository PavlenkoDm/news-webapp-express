const { dbFailure, redisGetData, redisSetData } = require("../../helpers");
const { NewsHistoryLog } = require("../../models");

const getHistoryLog = async (req, res) => {
  const { _id: id } = req.user;

  const cachedNewsLog = await redisGetData(`Cached news history log ${id}`);

  if (cachedNewsLog) {
    res.status(200);
    res.json({
      code: 200,
      message: "Get history-log success",
      data: cachedNewsLog,
    });
    return;
  }

  const data = await NewsHistoryLog.find({ newsOwner: id }, "-createdAt -updatedAt -newsOwner");
  if (!data) {
    dbFailure();
    return;
  }

  await redisSetData(`Cached news history log ${id}`, data);

  res.status(200);
  res.json({
    code: 200,
    message: "Get history-log success",
    data,
  });
};

module.exports = { getHistoryLog };

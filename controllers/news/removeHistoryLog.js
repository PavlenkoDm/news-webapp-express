const { dbFailure } = require("../../helpers");
const { NewsHistoryLog } = require("../../models");

const removeHistoryLog = async (req, res) => {
  const { _id: id } = req.user;

  const data = await NewsHistoryLog.deleteMany({ newsOwner: id });
  if (!data) {
    dbFailure();
    return;
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Your History Log news feed has been successfully cleared",
  });
};

module.exports = { removeHistoryLog };

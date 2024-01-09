const { clientRedis } = require("../configs");
const dbFailure = require("./dbFailure");
const parse = require("./parse");

const redisGetData = async key => {
  try {
    const dataFromRedis = await clientRedis.get(key);
    return parse(dataFromRedis);
  } catch (error) {
    console.log(error);
    dbFailure();
  }
};

module.exports = redisGetData;

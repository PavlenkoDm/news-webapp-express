const { clientRedis } = require("../configs");
const dbFailure = require("./dbFailure");
const stringify = require("./stringify");

const redisSetData = async (key, value) => {
  try {
    await clientRedis.set(key, stringify(value), { EX: 3600 });
  } catch (error) {
    console.log(error);
    dbFailure();
  }
};

module.exports = redisSetData;

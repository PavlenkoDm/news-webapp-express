const { createClient } = require("redis");
const { REDIS_PW, REDIS_HOST, REDIS_PORT } = process.env;

const clientRedis = createClient({
  password: REDIS_PW,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

module.exports = { clientRedis };

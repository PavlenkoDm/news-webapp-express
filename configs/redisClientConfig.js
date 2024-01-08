const { createClient } = require("redis");

const clientRedis = createClient({
  password: "kPlIXIuBWBhfrqJbZYBulqDgfIqMJUDc",
  socket: {
    host: "redis-19083.c322.us-east-1-2.ec2.cloud.redislabs.com",
    port: 19083,
  },
});

module.exports = { clientRedis };

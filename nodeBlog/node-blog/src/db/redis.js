const redis = require("redis");
const { REDIS_CONFIG } = require("../config/db");


// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

// 连接数据库 
(async () => {
  await redisClient.connect().then(() => console.log("redis connect success"));
})()

// set
async function set(key, val) {
  let objVal
  if (typeof val === 'object') {
    objVal = JSON.stringify(val)
  }

  await redisClient.set(key, objVal ?? val)
}


// get
async function get(key) {
  try {
    let val = await redisClient.get(key);
    if (val == null) return val

    try {
      val = JSON.parse(val)
    } catch (error) { }

    return val
  } catch (error) {
    throw err
  }
}

module.exports = { get, set }

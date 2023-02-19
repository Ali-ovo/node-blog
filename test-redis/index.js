const redis = require("redis");


// V3
// // 创建客户端
// const redisClient = redis.createClient(6379, "127.0.0.1")
// redisClient.on("error", err => {
//   console.log("err", err);
// })
// redisClient.set("myname", 'ali', redis.print)
// redisClient.get("myname", (err, val) => {
//   if (err) {
//     console.log("err", err);
//     return
//   }
//   console.log("val", val);
//   // 退出
//   redisClient.quit()
// })



// v4
(async () => {
  // 创建客户端
  const redisClient = redis.createClient(6379, "127.0.0.1");

  //  链接
  await redisClient.connect().then(() => console.log("redis connect success"));

  //  设置
  await redisClient.set("myname", 'ali2').then(() => console.log("redis set success"));

  //  获取
  const myname = await redisClient.get("myname");
  console.log("myname", myname);

  // 退出
  redisClient.quit()
})()
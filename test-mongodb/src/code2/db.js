const mongoose = require("mongoose")

const url = "mongodb://localhost:27017";
const dbName = 'myblog';

mongoose.set('strictQuery', false); // 关闭严格模式(默认为true

mongoose.connect(`${url}/${dbName}`, {
  // 配置
}).then(() => console.log('数据库连接成功!'))

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("数据库连接失败", err);
})


module.exports = mongoose
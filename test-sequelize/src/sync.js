const seq = require("./db")
// 引入需要同步的模型

require("./model")


// 测试连接
// 测试连接
seq.authenticate().then(() => {
  console.log('sequelize connect success')
}).catch(() => {
  console.log('sequelize connect fail')
})



// 执行同步
seq.sync({ force: true }).then(() => {
  process.exit() // 退出进程
})
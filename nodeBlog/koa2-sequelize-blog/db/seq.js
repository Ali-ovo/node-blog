const Sequelize = require("sequelize")
const { MYSQL_CONFIG } = require("../config/db")
const ENV = process.env.NODE_ENV



const conf = {
  "host": MYSQL_CONFIG.host,
  dialect: 'mysql'
}


// 生产环境下使用连接池
if (ENV === 'production') {
  conf.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0, // 最小
    idle: 10 * 1000 // 如果一个连接池 10s 之内没有被使用，则释放
  }

}



// 创建连接对象
const seq = new Sequelize(
  MYSQL_CONFIG.database_seq,
  MYSQL_CONFIG.user,
  MYSQL_CONFIG.password,
  conf
)

// 测试连接
seq.authenticate().then(() => {
  console.log('sequelize connect success')
}).catch(() => {
  console.log('sequelize connect fail')
})

module.exports = seq

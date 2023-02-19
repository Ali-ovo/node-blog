const env = process.env.NODE_ENV // 环境变量

let MYSQL_CONFIG
let REDIS_CONFIG

if (env === 'dev') {
  // mysql
  MYSQL_CONFIG = {
    host: '127.0.0.1',
    user: 'root',
    password: 'wzy2580.',
    port: '3306',
    database: 'myblog',
    database_seq: "myblog_sequelize"
  }

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1"
  }
} else if (env === 'production') {

  // mysql
  MYSQL_CONFIG = {
    host: '127.0.0.1',
    user: 'root',
    password: 'wzy2580.',
    port: '3306',
    database: 'myblog',
    database_seq: "myblog_sequelize"
  }

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1"
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}

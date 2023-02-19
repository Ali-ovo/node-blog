const Sequelize = require("sequelize")
const seq = require("../seq")


// 创建 User 模型
const User = seq.define(
  "user",  // 对应同步到数据库中的表名 users
  {
    // id 会自动创建并设为主键
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    realname: {
      type: Sequelize.STRING,
    }
  }
)

module.exports = User

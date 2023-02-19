const Sequelize = require("sequelize")
const seq = require("../seq")



// 创建 Blog 模型
const Blog = seq.define(
  "blog", // 对应同步到数据库中的表名 blogs
  {
    // id 会自动创建并设为主键
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },

    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },

    author: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
)

module.exports = Blog

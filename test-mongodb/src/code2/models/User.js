// 对应 user 集合

const mongoose = require("../db")


// 定义 Schema 规范
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true, // 必填
    unique: true // 唯一
  },
  password: String,
  realname: String,
})


// 定义 Model
const User = mongoose.model('user', UserSchema)

module.exports = User
const User = require("../db/model/user")



// sequelize  async
const login = async (username, password) => {
  const user = await User.findOne({
    // 条件
    where: {
      username,
      password
    }
  })

  if (user == null) return null

  return user.dataValues

}

module.exports = {
  login
}
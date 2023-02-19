const User = require('../db/models/User')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
  password = genPassword(password)
  const user = await User.find({
    username, password
  })

  console.log(user);

  return user[0] || {}
}

module.exports = {
  login
}

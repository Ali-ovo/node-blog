const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
  username = escape(username)

  // sql 注入预防 和 密码加密
  password = escape(genPassword(password))

  const sql = `select username, realname from users where username=${username} and password=${password}`
  return exec(sql).then(rows => rows[0] || {})
}

module.exports = {
  login
}

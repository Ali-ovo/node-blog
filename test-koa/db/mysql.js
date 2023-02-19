const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')


// 创建链接对象
// 创建链接对象
const con = mysql.createConnection(MYSQL_CONFIG)

//  开始链接
con.connect()

// 统一执行 sql 的函数
function exec(sql) {
  return new Promise((res, rej) => {
    con.query(sql, (err, result) => {
      if (err) {
        rej(err)
        return
      }

      res(result)
    })
  })
}

module.exports = { exec, escape: mysql.escape }

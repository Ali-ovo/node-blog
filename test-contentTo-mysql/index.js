const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'wzy2580.',
  port: '3306',
  database: 'myblog',
})

//  开始链接
con.connect()

// const sql = 'select id,realname,username from users;'
// const sql = "update users set username='ali2' where realname='ali2'"
// const sql = "insert into blogs(title, content, createtime, author) values ('标题C', '内容C', 167517711112, 'ali');"
const sql = 'select * from blogs;'

con.query(sql, (err, result) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(result)
})

con.end()

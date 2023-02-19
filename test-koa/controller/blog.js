const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }

  sql += `order by createtime desc;`

  // 返回 promise
  return await exec(sql)
}

const getDetail = async (id) => {
  let sql = `select * from blogs where id='${id}'`
  return await exec(sql).then(rows => rows[0])
}

const newBlog = async (blogData = {}) => {
  let { title = '', content = '', author = '' } = blogData
  const createTime = Date.now()
  const sql = `insert into blogs (title, content, createtime, author) values ('${xss(title)}', '${xss(content)}', ${createTime}, '${author}')`
  return await exec(sql).then(insertData => insertData.insertId)
}

const updateBlog = async (id, blogData = {}) => {
  const { title = '', content = '' } = blogData
  const sql = `update blogs set title='${title}', content='${content}' where id=${id}; `

  return await exec(sql).then(updateData => (updateData.affectedRows > 0 ? true : false))
}

const deleteBlog = async (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}';`
  return await exec(sql).then(deleteData => (deleteData.affectedRows > 0 ? true : false))
}

module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog }

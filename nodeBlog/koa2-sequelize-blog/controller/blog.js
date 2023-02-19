const Sequelize = require("sequelize")
const xss = require("xss")
const Blog = require("../db/model/blog")


const getList = async (author = "", keyword = "") => {
  const whereOpt = {}

  if (author) whereOpt.author = author
  if (keyword) whereOpt.title = {
    [Sequelize.Op.like]: `%${keyword}%`
  }

  const list = await Blog.findAll({
    // 条件
    where: whereOpt,
    // 排序
    order: [
      ["id", "desc"]
    ]
  })

  return list.map(row => row.dataValues)
}

const getDetail = async (id) => {
  const blog = await Blog.findOne({
    // 条件
    where: { id }
  })

  if (blog == null) return null
  return blog.dataValues
}

const newBlog = async (blogData = {}) => {
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = blogData.author
  const blog = await Blog.create({
    title,
    content,
    author
  })

  return {
    id: blog.dataValues.id
  }
}

const updateBlog = async (id, blogData = {}) => {
  const { title = '', content = '' } = blogData
  const blog = await Blog.update({
    title,
    content
  }, {// 条件
    where: { id }
  })

  return blog[0] >= 1
}

const deleteBlog = async (id, author) => {
  const blog = await Blog.destroy({
    // 条件
    where: { id, author }
  })

  return blog >= 1
}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
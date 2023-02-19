const xss = require('xss')
const Blog = require('../db/models/Blog')

const getList = async (author, keyword) => {

  // 动态拼接
  const whereOpt = {}
  if (author) whereOpt.author = author
  if (keyword) whereOpt.title = new RegExp(keyword)

  const list = await Blog.find(whereOpt).sort({ _id: -1 })
  return list
}

const getDetail = async (id) => {
  const detail = await Blog.findById(id)
  return detail
}

const newBlog = async (blogData = {}) => {
  let { title = '', content = '', author = '' } = blogData
  const blog = await Blog.create({
    title: xss(title),
    content: xss(content),
    author
  })

  return {
    id: blog._id
  }

}

const updateBlog = async (id, blogData = {}) => {
  const { title = '', content = '' } = blogData
  const blog = await Blog.findByIdAndUpdate(id, {
    title: xss(title),
    content: xss(content)
  }, { new: true })

  return Boolean(blog)
}

const deleteBlog = async (id, author) => {
  const deleteBlog = await Blog.findOneAndDelete({ _id: id, author })
  return Boolean(deleteBlog)
}

module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog }

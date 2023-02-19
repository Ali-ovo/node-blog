const { json } = require("express");
const express = require("express");
const router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require("../middleware/loginCheck")

router.get('/list', (req, res, next) => {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  // 管理员界面
  if (req.query.isadmin) {
    console.log("is admin");
    if (req.session.username == null) {
      return res.json(new ErrorModel("未登录"))
    }

    // 强制查询自己的博客
    author = req.session.username
  }

  return getList(author, keyword).then(listData => res.json(new SuccessModel(listData, '获取博客列表成功')))
})


router.get('/detail', (req, res, next) => {
  return getDetail(req.query.id).then(detailData => res.json(new SuccessModel(detailData, '获取博客详情成功')))
})

router.post("/new", loginCheck, (req, res, next) => {
  if (!req.body.content || !req.body.title) {
    return res.json(new ErrorModel('标题或内容不能为空'))
  }

  return newBlog({ ...req.body, author: req.session.username }).then(data => res.json(new SuccessModel(data, '新建博客成功')))
})

router.post("/update", loginCheck, (req, res, next) => {
  return updateBlog(req.query.id, req.body).then(val =>
    res.json(val ? new SuccessModel(val, '更新博客成功') : new ErrorModel('更新博客失败'))
  )
})

router.post("/delete", loginCheck, (req, res, next) => {
  return deleteBlog(req.query.id, req.session.username).then(val =>
    res.json(val ? new SuccessModel(val, '删除博客成功') : new ErrorModel('删除博客失败'))
  )
})

module.exports = router
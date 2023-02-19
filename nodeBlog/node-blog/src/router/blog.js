const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

const handleBlogRouter = async (req, res) => {
  const method = req.method // GET POST
  const id = req.query.id || ''

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    // 管理员界面
    if (req.query.isadmin) {

      const loginCheckResult = await loginCheck(req);
      if (loginCheckResult) {
        return loginCheckResult;
      }

      // 强制查询自己的博客
      author = req.session.username
    }


    return getList(author, keyword).then(listData => new SuccessModel(listData, '获取博客列表成功'))
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {

    return getDetail(id).then(detailData => new SuccessModel(detailData, '获取博客详情成功'))
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {

    if (!req.body.content || !req.body.title) {
      return new ErrorModel('标题或内容不能为空')
    }

    const loginCheckResult = await loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    return newBlog({ ...req.body, author: req.session.username }).then(data => new SuccessModel(data, '新建博客成功'))
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {

    const loginCheckResult = await loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    return updateBlog(id, req.body).then(val =>
      val ? new SuccessModel(val, '更新博客成功') : new ErrorModel('更新博客失败')
    )
  }

  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/delete') {

    const loginCheckResult = await loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    return deleteBlog(id, req.session.username).then(val =>
      val ? new SuccessModel(val, '删除博客成功') : new ErrorModel('删除博客失败')
    )
  }
}

module.exports = handleBlogRouter

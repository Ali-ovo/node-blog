const router = require("koa-router")();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require("../middleware/loginCheck")

router.prefix("/api/blog");

router.get("/list", async (ctx, next) => {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  // 管理员界面
  if (ctx.query.isadmin) {
    console.log("is admin");
    if (ctx.session.username == null) {
      return ctx.body = new ErrorModel("未登录")
    }

    // 强制查询自己的博客
    author = ctx.session.username
  }
  const listData = await getList(author, keyword)

  ctx.body = new SuccessModel(listData, '获取博客列表成功')
})

router.get("/detail", async (ctx, next) => {
  const blogData = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(blogData, '获取博客详情成功')
})

router.post("/new", loginCheck, async (ctx, next) => {
  if (!ctx.request.body.content || !ctx.request.body.title) {
    return ctx.body = new ErrorModel('标题或内容不能为空')
  }

  console.log("ctx.request", ctx.request.body);


  const data = await newBlog({ ...ctx.request.body, author: ctx.session.username })

  ctx.body = new SuccessModel(data, '新建博客成功')
})

router.post("/update", loginCheck, async (ctx, next) => {
  const isUpdate = await updateBlog(ctx.query.id, ctx.body)

  ctx.body = isUpdate ? new SuccessModel(val, '更新博客成功') : new ErrorModel('更新博客失败')

})

router.post("/delete", loginCheck, async (ctx, next) => {
  const idDelete = await deleteBlog(ctx.query.id, ctx.session.username)

  ctx.body = idDelete ? new SuccessModel(idDelete, '删除博客成功') : new ErrorModel('删除博客失败')
})


module.exports = router
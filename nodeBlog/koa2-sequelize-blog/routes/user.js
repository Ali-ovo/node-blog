const router = require("koa-router")();
router.prefix("/api/user");
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post("/login", async (ctx, next) => {
  const { username = '', password = '' } = ctx.request.body

  return login(username, password).then(data => {
    if (data.username) {
      // 设置 session
      ctx.session.username = data.username
      ctx.session.realname = data.realname

      return ctx.body = new SuccessModel(data, '登录成功')
    }
    ctx.body = new ErrorModel('登录失败')
  })
})


router.get("/session-test", async (ctx, next) => {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++
  ctx.body = {
    code: 0,
    viewCount: ctx.session.viewCount
  }

})

module.exports = router
const { login } = require('../controller/user')
const { set } = require('../db/redis')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method // GET POST

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username = '', password = '' } = req.body
    return login(username, password).then(data => {
      if (data.username) {
        // 设置 session
        req.session.username = data.username
        req.session.realname = data.realname

        // 同步到 redis
        set(req.sessionId, req.session)

        return new SuccessModel(data, '登录成功')
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录验证的测试
  // if (method === 'GET' && req.path === '/api/user/login-test') {
  //   return req.session.username ? new SuccessModel({ session: req.session }) : new ErrorModel('尚未登陆')
  // }
}

module.exports = handleUserRouter

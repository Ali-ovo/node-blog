const express = require("express");
const router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', (req, res, next) => {
  const { username = '', password = '' } = req.body

  return login(username, password).then(data => {
    if (data.username) {
      // 设置 session
      req.session.username = data.username
      req.session.realname = data.realname

      return res.json(new SuccessModel(data, '登录成功'))
    }
    res.json(new ErrorModel('登录失败'))
  })
})

router.get("/login-test", (req, res, next) => {
  if (req.session.username) {
    return res.json({
      code: 0,
      message: "已登录"
    })

  }

  res.json({
    code: -1,
    message: "未登录"
  })

})


// router.get('/session-test', (req, res, next) => {
//   const session = req.session;

//   if (session.viewNum == null) {
//     session.viewNum = 0;
//   }

//   session.viewNum++; 

//   res.json({
//     code: 0,
//     data: {
//       viewNum: session.viewNum
//     }
//   })
// })




module.exports = router
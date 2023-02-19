const querystring = require('querystring')
const { access } = require('./src/utils/log')
const { get, set } = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

// 获取 post data
const getPostData = req => {
  return new Promise((res, rej) => {
    if (req.method !== 'POST' || req.headers['content-type' !== 'application/json']) {
      res({})
      return
    }

    let postData = ''
    req.on('data', chunk => (postData += chunk.toString()))
    req.on('end', () => {
      if (!postData) {
        res({})
        return
      }

      res(JSON.parse(postData))
    })
  })
}

const serverHandle = (req, res) => {
  // 记录
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  // 设置返回的格式
  res.setHeader('Content-type', 'application/json')

  // 获取 path
  const urlPar = req.url.split('?')
  req.path = urlPar[0]

  // 解析 query
  req.query = querystring.parse(urlPar[1])

  // 解析 cookie
  req.cookie = {}
  const cookieSte = req.headers.cookie || ''
  cookieSte.split(';').forEach(item => {
    if (!item) return
    const [key, value] = item.split('=')
    req.cookie[key.trim()] = value.trim()
  })

  // 使用 redis 解析session
  let needSetCookie = false
  let userId = req.cookie.userid
  if (!userId) {
    needSetCookie = true
    userId = Date.now() + '_' + Math.random()

    // 初始化 redis 中的 session 值
    set(userId, {})
  }

  // 获取 session
  get((req.sessionId = userId))
    .then(sessionData => {
      if (sessionData === null) {
        // 初始化 redis 中 session 值
        set(req.sessionId, {})

        // 设置 session
        req.session = {}
      } else {
        req.session = sessionData
      }

      return getPostData(req)
    })
    .then(async postData => {
      // 处理 post data
      req.body = postData

      const blogResult = await handleBlogRouter(req, res)
      if (blogResult) {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()};`)
        }

        res.end(JSON.stringify(blogResult))
        return
      }

      const userResult = await handleUserRouter(req, res)
      if (userResult) {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()};`)
        }

        res.end(JSON.stringify(userResult))
        return
      }

      // CORS 跨域
      // res.setHeader('Access-Control-Allow-Credentials', true); // 允许跨域携带cookie
      // res.setHeader('Access-Control-Allow-Origin', '*') // 允许跨域 Origin  * 代表所有域名都可以访问
      // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT') // 允许跨域的方法

      // 未命中路由，返回 404
      res.writeHead(404, { 'Content-type': 'text/plain' })

      res.write('404 Not Found')

      res.end()
    })
}

module.exports = serverHandle

// process.env.NODE_ENV

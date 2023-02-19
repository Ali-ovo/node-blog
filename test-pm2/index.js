const http = require("http")
const server = http.createServer((req, res) => {
  // 模拟日志
  console.log("request come", new Date())

  // 模拟错误
  if (req.url === '/err') {
    throw new Error('error')
  }


  res.setHeader("Content-type", "application/json")
  res.end(
    JSON.stringify({
      code: 0,
      msg: "pm2 success"
    })
  )
})

server.listen(8000, () => {
  console.log("server is running at port 8000")
})
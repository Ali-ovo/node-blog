const express = require("./like-express")

// http 请求实例
const app = express()

app.use((req, res, next) => {
  next()
})

app.use((req, res, next) => {
  // 假设在处理 cookie
  req.cookie = {
    userId: "abc123"
  }
  next()
})

app.use("/api", (req, res, next) => {
  next()
})

app.get("/api", (req, res, next) => {
  next()
})


app.get("/api/get-cookie", (req, res, next) => {
  setTimeout(() => {
    next()
  })
}, (req, res, next) => {
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.listen(8000, () => {
  console.log("server is running on port 8000")
})

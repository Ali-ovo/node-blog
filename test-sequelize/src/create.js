const { User, Blog } = require("./model");

// await 语法
!(async () => {
  // 创建 User
  const ali = await User.create({
    username: "ali",
    password: "123",
    realname: "阿离"
  })
  console.log("ali", ali.dataValues);

  // 创建 Blog
  const blog1 = await Blog.create({
    title: "标题AAA",
    content: "内容AAA",
    author: ali.dataValues.username
  })
})()
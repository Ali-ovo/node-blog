const Blog = require("../models/Blog");

(async () => {
  // 新建博客
  // const newBlog = await Blog.create({
  //   title: "标题3",
  //   content: "内容3",
  //   author: "zhangsan"
  // })


  // 查询博客
  // const blogList = await Blog.find().sort({ _id: -1 })

  // 根据id查询博客
  // const blog = await Blog.findById("63ef14495b5ed7ae19833d57")

  // 更新博客
  // const res = await Blog.findByIdAndUpdate(
  //   "63ef14495b5ed7ae19833d57",
  //   { content: "内容3_update", title: "标题3_update" },
  //   {
  //     new: true,  // 返回更新后的数据,
  //   }
  // );

  // 删除博客
  const res = await Blog.findOneAndDelete(
    {
      _id: "63ef14495b5ed7ae19833d57",
      author: "zhangsan"
    }
  )

  console.log("res", res)

})()
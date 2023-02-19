const { Blog } = require("./model")


  ; (async () => {
    const updateRes = await Blog.update({
      title: "标题BBB",
      content: "内容BBB",
    }, {
      where: {
        id: 3
      }
    })

    console.log("updateRes", updateRes);
  })() 
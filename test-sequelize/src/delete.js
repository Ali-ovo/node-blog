const { Blog } = require("./model")



  ; (async () => {
    const deleteRes = await Blog.destroy({
      where: {
        id: 2,
        author: "ali"
      }
    })

    console.log("deleteRes", deleteRes);
  })()
const Sequelize = require("sequelize")
const { User, Blog } = require("./model")

  ; (async () => {

    // 登录效果
    const ali = await User.findOne({
      // 查询条件
      where: {
        userName: "ali",
        password: "123"
      }
    })

    // if (ali) {
    //   console.log("ali", ali.dataValues);
    // } else {
    //   console.log(ali);
    // }

    // 查询博客列表
    const blogList = await Blog.findAll({
      // 查询条件
      where: {
        title: {
          [Sequelize.Op.like]: "%标题%" // 模糊查询
        }
      },
      // 排序
      order: [
        ["id", "desc"] // SQL: order by id desc
      ]
    })

    console.log("blogList", blogList.map(blog => blog.dataValues));

  })()
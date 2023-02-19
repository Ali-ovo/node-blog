const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = 'myblog';


async function main() {
  await client.connect();

  const db = client.db(dbName);

  // 使用集合
  const userCollection = db.collection('users');


  // 新增
  await userCollection.insertOne({
    username: "zhangsan",
    age: 20,
    password: "123456",
    realname: "张三"
  }).then(result => {
    console.log("新增成功", result);
  })


  // 修改
  await userCollection.updateOne({
    username: "zhangsan"
  }, {
    $set: { realname: "张三AAA" }
  }).then(result => {
    console.log("修改成功", result);
  })
 
  // 删除
  await userCollection.deleteOne({
    username: "zhangsan"
  }).then(result => {
    console.log("删除成功", result);
  })

  // 查询
  await userCollection.find().toArray().then(result => {
    console.log('查询成功', result);
  });



  return '数据库连接成功.';
}

main()
  .then(console.log)
  .catch((err) => {
    console.log("数据库连接失败", err);
  })
  .finally(() => client.close());



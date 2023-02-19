const fs = require("fs");
const path = require("path");

const fileName = path.resolve(__dirname, "data.txt");

// read file
// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   // data is a buffer
//   console.log(data.toString());
// })


// write file
// const content = '\nThis is a new content\n';
// const opt = {
//   flag: 'a' // append to the file 覆盖使用 'w'
// }
// fs.writeFile(fileName, content, opt, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// })


// // check file exist
// fs.exists(fileName, (exist) => {
//   console.log('exist', exist);
// })
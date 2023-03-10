const fs = require("fs");
const path = require("path");

// 写日志
const writeLog = (writeStream, log) => {
  writeStream.write(log + '\n') // 关键
}

// 生成 write Stream
const createWriteStream = (fileName) => {
  const fullFileName = path.join(__dirname, "../", "../", 'logs', fileName);

  const writeStream = fs.createWriteStream(fullFileName, { flags: 'a' })

  return writeStream
}


// 写访问日志
const accessWriteStream = createWriteStream('access.log');
const access = (log) => {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}

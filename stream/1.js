// 引入一个文件模块
const fs = require('fs');
// createWriteStream 往一个文件中写入/修改等
// 没有这个文件就会先创建
const stream = fs.createWriteStream('./big_file.txt')
// 循环的往里面写入内容
for (let i = 0; i < 1000000; i++) {
    stream.write(`这是第 ${i} 行内容, 我们需要很多很多内容, 要不停地写文件啊啊啊啊啊啊回车\n`)
}
// 别忘了关掉 stream
stream.end();
console.log('done');
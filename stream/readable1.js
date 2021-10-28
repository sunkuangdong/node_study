const { Readable } = require("stream")
const inStream = new Readable()
inStream.push("ABCDEFGHIJKLM")
inStream.push("NOPQRSTUVWXYZ")
inStream.push(null) // No more data

// inStream.pipe(process.stdout)
// 保存文件为 readable.js 然后用 node 运行 
// 我们先把所有数据都 push 进去了, 然后pipe

inStream.on('data', (chunk) => {
    process.stdout.write(chunk)
    console.log('写数据了')
})
const fs = require('fs');
const http = require('http')
// 请先引入 fs 和 http
const server = http.createServer()
// 监听 request
server.on("request", (request, response) => {
    // 'text/html; charset=utf-8'
    response.writeHead(200, {
        'Content-Type': 'application/json'
    })
    // 读取 big_file.txt 文件
    fs.readFile('./big_file.txt', (error, data) => {
        if (error) throw error
        response.end(data)
        console.log('done')
    })
})
server.listen(8887)
console.log('http://localhost:8887/')
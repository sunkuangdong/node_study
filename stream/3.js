// 请先引入fs和http
const fs = require('fs');
const http = require('http');
const server = http.createServer();
server.on('request', (request, response) => {
    // 'text/html; charset=utf-8'
    response.writeHead(200, {
        'Content-Type': 'application/json'
    })
    const stream = fs.createReadStream('./big_file.txt')
    stream.pipe(response)
})
server.listen(8888)
console.log('http://localhost:8888/')
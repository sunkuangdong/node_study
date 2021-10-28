import * as http from 'http'
import * as fs from "fs"
import * as p from 'path'
import * as url from 'url'
import { IncomingMessage, ServerResponse } from 'http'

const server = http.createServer()
// 获取绝对路径拼接
const publicDir = p.resolve(__dirname, "public")
// 让用户设置缓存时间
let cacheAge = 3600 * 24 * 365
// 让 server 监听一下 request事件
// 如果有人请求，就执行函数回调
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const { method, url: path, headers } = request
    // 过滤 method
    if (method !== 'GET') {
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.statusCode = 405
        response.end('静态服务器不支持post')
        return
    }
    const { pathname, search } = url.parse(path)
    let filename = pathname.substring(1)
    if (filename === '') {
        filename = 'index.html'
    }
    fs.readFile(p.resolve(publicDir, filename), (error, data) => {
        if (error) {
            // 判断是否是404
            console.log(error);
            if (error.errno === -2) {
                response.statusCode = 404
                // 读取404文件
                fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
                    // 如果404响应給浏览器文件
                    response.end(data)
                })
            } else if (error.errno === -4068) {
                response.setHeader('Content-Type', 'text/html; charset=utf-8')
                response.statusCode = 403
                response.end('无权限访问')
            } else {
                response.setHeader('Content-Type', 'text/html; charset=utf-8')
                response.statusCode = 500
                response.end('服务器内部错误')
            }
        } else {
            // 返回文件内容 进行缓存 首页是不能缓存的
            response.setHeader("Cache-Control", `public, max-age=${cacheAge}`)
            response.end(data);
        }

    })
})
server.listen(8888)
const child_process = require('child_process')
// 创建一个子进程
const n = child_process.fork('./child.js')

// 父进程接受到子进程传递的信息
n.on('message', function (m) {
    console.log('父进程得到值：', m);
})

// 父进程给子进程传递消息
n.send({
    hello: 'world'
})
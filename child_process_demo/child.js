// 子进程给父进程发送信息
setTimeout(() => {
    process.send({
        foo: 'bar'
    })
}, 2000)

process.on('message', (m) => {
    console.log("父进程传递给子进程的消息：", m);
})
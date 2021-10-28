const util = require('util');
const childProcessDemo = require('child_process')
const {
    exec
} = childProcessDemo

const exec2 = util.promisify(exec)

// exec 接受一个命令
/*
    err：错误
    stdout：标准输出，命令行窗口
    stderr：标准错误，展示错误信息
*/

exec2('ls -l ../').then((chunk) => {
    console.log(chunk)
})


// const streams = exec('ls -l ../')
// streams.stdout.on("data", (chunk) => {
//   console.log(chunk)
// })
// streams.stderr.on('data', (error) => {
//   console.log(error)
// })
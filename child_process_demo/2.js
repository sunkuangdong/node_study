const childProcessDemo = require('child_process')
const {
    execFile
} = childProcessDemo

const userInput = '.'

execFile('ls', ['-la', userInput], {
    cwd: 'edz',
    maxBuffer: 1024 * 1024 // 缓存多大
}, (err, stdout) => {
    console.log("err")
    console.log(err)
    console.log("stdout")
    console.log(stdout)
})
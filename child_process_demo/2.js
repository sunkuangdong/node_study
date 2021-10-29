const childProcessDemo = require('child_process')
const {
    spawn
} = childProcessDemo

const userInput = '.'

const streams = spawn('ls', ['-la', userInput], {
    env: {
        NODE_ENV: 'development'
    }
})

streams.stdout.on('data', (chunk) => {
    console.log(chunk.toString())
})
const {
    Readable
} = require("stream")
const inStream = new Readable({
    read(size) {
        const chart = String.fromCharCode(this.currentCharCode++)
        this.push(chart)
        console.log(`推了：${chart}`)
        if (this.currentCharCode > 90) {
            this.push(null)
        }
    }
})

inStream.currentCharCode = 65

inStream.pipe(process.stdout)
//保存文件为 readable2.js然后用node运行
//这次的数据是按需供给的,对方调用read我们才会给一次数据
const fs = require("fs")
// 做gzip压缩
const zlib = require("zlib")
const {
    Transform
} = require("stream")
const file = process.argv[2]
// 加密
const crypto = require("crypto")

const reportProgress = new Transform({
    transform(chunk, encoding, callback) {
        process.stdout.write('.')
        callback(null, chunk)
    }
})

fs.createReadStream(file)
    .pipe(crypto.createCipher('aes192', '123456'))
    .pipe(zlib.createGzip())
    .pipe(reportProgress)
    .pipe(fs.createWriteStream(file + ".gz"))
    .on("finish", () => {
        console.log("\nDone")
    })
const fs = require('fs');

function writeOneMillionTimes(writer, data) {
    let i = 1000000;
    write();

    function write() {
        let ok = true;
        do {
            i--;
            if (i === 0) {
                writer.write(data)
            } else {
                ok = writer.write(data)
                if (ok === false) {
                    console.log('无法再写了')
                }
            }
        } while (i > 0 && ok)
        if (i > 0) {
            writer.once('drain', () => {
                console.log('干涸了')
                write()
            });
        }
    }
}
const stream = fs.createWriteStream('./big_file.txt')
writeOneMillionTimes(stream, 'hello world')
var mysql = require('mysql');
// 初始化 mysql
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456'
});
// 链接
connection.connect();

// 创建 DATABASE 数据库
// IF NOT EXISTS 为了防止每次都创建一个 fang 的数据库
connection.query('CREATE DATABASE IF NOT EXISTS fang DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_520_ci;', function (error, results, fields) {
    if (error) throw error
    console.log('results one:', results)
});

// 先use一下, 这个就是终端运行的命令
connection.query('use fang;')
// 创建表
connection.query(`CREATE TABLE IF NOT EXISTS user(
    name text,
    age int
)`, function (error, results, fields) {
    if (error) throw error
    console.log('results two:', results)
});
// 结束进程
connection.end();
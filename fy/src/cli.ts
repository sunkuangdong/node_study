#!/usr/bin/env node
// 命令行文件
import * as commander from 'commander';
import { translate } from './main';
const program = new commander.Command();
// 声明版本
program.version('0.0.1')
    .name('fy')
    .usage('<English>')
    .arguments('<English>') // 获取参数
    .action((english) => {
        translate(english)
    })

// parse 是对参数进行解析
// 比如解析-h | -v 等参数
program.parse(process.argv)
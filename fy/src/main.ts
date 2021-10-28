#!/usr/bin/env node
// 源码文件 主要功能：翻译
import * as https from 'https'
const md5 = require('md5');
import * as querystring from 'querystring'
import { appid, appSecret } from './private';
type BaiDuResult = {
    error_code?: string
    error_message?: string
    from: string
    to: string
    trans_result: {
        src: string
        dst: string
    }[]
}
type ErrorMap = {
    [key: string]: string
}
const errorMap: ErrorMap = {
    52001: '请求超时',
    52002: '系统错误',
    52003: '用户认证失败，可能是 appid 错误或者服务并未开通',
    54000: '必填参数为空，请检查是否少传参数',
    54001: '签名错误，请检查您的签名生成方法',
    54003: '访问频率受限，请降低您的调用频率，或进行身份认证后切换为高级版/尊享版',
    54004: '账户余额不足，请前往管理控制台为账户充值',
    54005: '长query请求频繁，请降低长query的发送频率，3s后再试',
    58000: '客户端IP非法，检查个人资料里填写的IP地址是否正确，可前往开发者信息-基本信息修改',
    58001: '译文语言方向不支持，检查译文语言是否在语言列表里',
    58002: '服务当前已关闭，请前往管理控制台开启服务',
    90107: '认证未通过或未生效，请前往我的认证查看认证进度',
}
export const translate = (world: string) => {
    const salt = Math.random()
    const sign = md5(appid + world + salt + appSecret)
    let from, to
    if (/[a-zA-Z]/.test(world[0])) {
        // 英译中
        from = 'en'
        to = 'zh'
    } else {
        // 中译英
        from = 'zh'
        to = 'en'
    }
    const query: string = querystring.stringify({
        q: world,
        from,
        to,
        appid,
        salt,
        sign,
    })
    const options = {
        hostname: 'fanyi-api.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + query,
        method: 'GET',
    }
    const request = https.request(options, (response) => {
        let chunks: Buffer[] = []
        response.on('data', (chunk) => {
            chunks.push(chunk)
        })
        response.on('end', () => {
            const string = Buffer.concat(chunks).toString()
            const object: BaiDuResult = JSON.parse(string)
            if (object.error_code && object.error_code in errorMap) {
                console.error(errorMap[object.error_code] || object.error_message)
                // 退出当前进程
                process.exit(2)
            } else {
                console.log('object.trans_result', object.trans_result[0].dst)
                process.exit(0)
            }
        })
    })
    request.on('error', (e) => {
        console.error(e)
    })
    request.end()
}
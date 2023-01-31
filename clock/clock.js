/**
 * 实现步骤
 * 1、创建两个正则表达式，分别用来匹配<style>和<script>
 * 2、使用fs模块，读取需要被处理的HTML文件
 * 3、自定义resolveCSS方法，来写入index.css样式文件
 * 4、自定义resolveJS方法，来写入index.js脚本文件
 */

// 导入模块
const fs = require('fs')
const path = require('path')

/**
 *      \s表示空白字符
 *      \S表示非空白字符
 *      * 表示匹配任意次数
 */
// 创建匹配style标签的正则表达式
let regStyle = /<style>[\s\S]*<\/style>/

// 创建script标签的正则表达式
let regScript = /<script>[\s\S]*<\/script>/

// 使用fs模块，读取需要被处理的HTML文件

fs.readFile(path.join(__dirname, './material/index.html'), 'utf-8', function(err, dataStr) {
    if(err) {
        return console.log('文件读取失败！' + err.message)
    }
    console.log('文件读取成功！')

    // 读取成功后，调用对应的三个方法，分别拆解出css，js，html文件

    // 处理css样式
    resolveCSS(dataStr) 
    // 处理script
    resolveScript(dataStr) 
    // 处理HTML
    resolveHTML(dataStr)
})
function resolveCSS(htmlSrc) {
    /**
     * exec() 方法是一个正则表达式方法。
     * 它通过指定的模式（pattern）搜索字符串，并返回已找到的文本。
     * 返回值为一个数组
     * 如果未找到匹配，则返回 null。
     */
    // 使用正则提取页面中的<style></style>标签
    let cssArr = regStyle.exec(htmlSrc)
    // console.log(cssArr)
    // 将提取出的样式字符串做进一步的处理
    let css = cssArr[0].replace('<style>', '').replace('</style>', '')
    // console.log(css)
    // 将提取出的css样式写入到index.css样式中
    fs.writeFile(path.join(__dirname, './css/index.css'), css, err => {
        if(err) {
            return console.log(err.message)
        }
    })
}
function resolveScript(htmlSrc) {

    let scriptArr = regScript.exec(htmlSrc)
    // 将提取出的样式字符串做进一步的处理
    let script = scriptArr[0].replace('<script>', '').replace('</script>', '')
    // 将提取出的css样式写入到index.css样式中
    fs.writeFile(path.join(__dirname, './js/index.js'), script, err => {
        if(err) {
            return console.log(err.message)
        }
    })
}
function resolveHTML(htmlSrc) {
    // 使用字符串replace方法把内嵌的style和script标签替换为外联的link标签和script标签
    let HTML = htmlSrc
    .replace(regStyle, '<link rel="stylesheet" href="./css/index.css"/>')
    .replace(regScript, '<script src="./js/index.js"></script>')
    // console.log(HTML)

    // 完成替换后写入到index.html中
    fs.writeFile(path.join(__dirname, './index.html'), HTML, err => {
        if(err) {
            return console.log(err.message)
        }
    })
}
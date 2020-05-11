const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/index')
const path = require('path')

// 解析请求参数
app.use(bodyParser.json())

//加载静态
// app.use(express.static('views'))
app.use(express.static('bin'))
app.use('/public', express.static('public'))

//加载路由
routes(app)
//启动配置
const prot = 3000
const host = 'localhost'
app.listen(prot, host, () => {
  console.log(`启动成功： http://${host}:${prot}`)
})

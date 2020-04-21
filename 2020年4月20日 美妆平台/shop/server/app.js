const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/index')

// 解析请求参数
app.use(bodyParser.json())

//加载静态
app.use(express.static('views'))
app.use(express.static('public'))

// 设置ejs目录
app.set('view engine', 'ejs')

//加载路由
routes(app)

//启动配置
const prot = 3000
const host = 'localhost'
app.listen(prot, host, () => {
  console.log(`启动成功： http://${host}:${prot}`)
})

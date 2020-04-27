const express = require('express')
const router = express.Router()
const { mysql, sqlFormat } = require('../mysql/index')

router.post('/', (req, res) => {
  let body = req.body
  let sql = `select * from user_db where userName = '${body.userName}' and password = '${body.password}' and userType = '${body.userType}'`
  mysql.query(sql, (err, result) => {
    result = sqlFormat(result)
    if (err) {
      res.send({
        code: 0,
        msg: err.sqlMessage
      })
      return
    }
    if (result.length === 0) {
      res.send({
        code: 0,
        msg: '用户名或密码错误'
      })
      return
    }
    res.send({
      code: 1,
      msg: '登录成功',
      data: result[0]
    })
  })
})

module.exports = router
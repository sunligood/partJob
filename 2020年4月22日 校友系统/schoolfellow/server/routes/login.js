const express = require('express')
const router = express.Router()
const {mysql, sqlFormat} = require('../mysql/index')

router.post('/', (req, res) => {
  let body = req.body
  let sql = `select * from user_db where name = '${body.name}' and password = '${body.password}'`
  mysql.query(sql, (err, result) => {
    result = sqlFormat(result)
    if (err) {
      res.send({
        code: 0,
        msg: err
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
const express = require('express')
const router = express.Router()
const { mysql, sqlFormat } = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = `select * from user_db where userType = 1 `
  // 商户查询
  if (data.type === '2') {
    sql = `select * from user_db where userType = 2`
  }
  mysql.query(sql, (err, result) => {
    result = sqlFormat(result)
    if (err) {
      res.send({
        code: 0,
        msg: err
      })
      return
    }
    res.send({
      code: 1,
      msg: '查询成功',
      data: result
    })
  })
})

module.exports = router
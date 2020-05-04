const express = require('express')
const router = express()
const { mysql, sqlFormat } = require('../mysql/index')

router.post('/', (req, res) => {
  let body = req.body
  // id查询
  sql = `select * from deal_db where userID='${body.userID}'`
  mysql.query(sql, (err, result) => {
    result = sqlFormat(result)
    if (err) {
      res.send({
        code: 0,
        msg: err.sqlMessage
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
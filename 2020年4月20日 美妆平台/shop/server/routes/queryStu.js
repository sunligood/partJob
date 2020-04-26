const express = require('express')
const router = express.Router()
const {mysql, sqlFormat} = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = `select * from user_db where root != 1`
  // 班级查询
  if (data.systems && data.major && data.class) {
    sql = `select * from user_db where systems='${data.systems}' and major='${data.major}' and class='${data.class}'`
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
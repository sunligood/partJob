const express = require('express')
const router = express()
const {mysql,sqlFormat} = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = `select * from message_db`
  // 班级留言查询
  if (data.systems && data.major && data.class) {
    sql = `select * from message_db where systems='${data.systems}' and major='${data.major}' and class='${data.class}'`
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
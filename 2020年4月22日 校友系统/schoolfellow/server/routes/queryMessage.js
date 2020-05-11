const express = require('express')
const router = express()
const { mysql, sqlFormat } = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = `select * from message_db`
  // 班级查询
  if (data.systems || data.major || data.class) {
    let unit = ''
    for (let key in data) {
      if (data[key] !== '') {
        unit += `${key}='${data[key]}'&and&`
      }
    }
    unit = unit.replace(/&/g, ' ')
    unit = unit.substring(0, unit.length - 5)
    sql = `select * from message_db where ${unit}`
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
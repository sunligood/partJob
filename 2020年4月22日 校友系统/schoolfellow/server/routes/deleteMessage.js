const express = require('express')
const router = express()
const {mysql} = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = ''
  if (!Array.isArray(data.msgID)) {
    sql = `delete from message_db where msgID=${data.msgID}`
  } else {
    let model_sql = `delete from message_db where msgID=?`
    // 拼接sql语句
    data.msgID.forEach((item, index)=>{
      sql += mysql.format(model_sql, item) + ';'
    })
  }
  mysql.query(sql, (err) => {
    if (err) {
      res.send({
        code: 0,
        msg: err
      })
      return
    }
    res.send({
      code: 1,
      msg: '删除成功'
    })
  })
})

module.exports = router
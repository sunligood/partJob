const express = require('express')
const router = express()
const { mysql } = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = `delete from prd_db where prdID=${data.prdID}`
  mysql.query(sql, (err) => {
    if (err) {
      res.send({
        code: 0,
        msg: err.sqlMessage
      })
      return
    }
    res.send({
      code: 1,
      msg: '下架成功'
    })
  })
})

module.exports = router
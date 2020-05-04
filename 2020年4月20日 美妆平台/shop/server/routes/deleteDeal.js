const express = require('express')
const router = express()
const { mysql } = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = `delete from deal_db where id=${data.id}`
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
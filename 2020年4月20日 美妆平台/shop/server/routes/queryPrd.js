const express = require('express')
const router = express()
const { mysql, sqlFormat } = require('../mysql/index')

router.post('/', (req, res) => {
  let body = req.body
  // 默认查询全部
  let sql = `select * from prd_db`
  // 关键词查询
  if (body.keywords) {
    sql = `select * from prd_db where prdName  like '%${body.keywords}%' or detail like '%${body.keywords}%'`
  }
  // id查询
  if (body.prdID) {
    sql = `select * from prd_db where prdID='${body.prdID}'`
  }
  // 商铺商品查询
  if (body.storeName) {
    sql = `select * from prd_db where storeName='${body.storeName}'`
  }
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
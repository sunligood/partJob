const express = require('express')
const router = express()
const { mysql, sqlFormat } = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = ''
  let sqlData = []
  if (data.type === 'add') {
    sql = `insert into share_db(imgUrl,prdName,price,userID,prdID) values ('${data.imgUrl}','${data.prdName}','${data.price}',${data.userID},${data.prdID})`
  } else if (data.type === 'query') {
    sql = `select DISTINCT prdID, prdName, userID,price,imgUrl  from share_db where userID=${data.userID}`
  }
  mysql.query(sql, (err, result) => {

    if (err) {
      res.send({
        code: 0,
        msg: err.sqlMessage
      })
      return
    }
    if (data.type === 'query') {
      result = sqlFormat(result)
      res.send({
        code: 1,
        msg: '查询成功',
        data: result
      })
    } else {
      res.send({
        code: 1,
        msg: '添加成功'
      })
    }

  })
})

module.exports = router
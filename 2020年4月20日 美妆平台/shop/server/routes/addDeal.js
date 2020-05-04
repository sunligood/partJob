const express = require('express')
const router = express()
const { mysql, sqlFormat } = require('../mysql/index')
// result = sqlFormat(result)

router.post('/', (req, res) => {
  let data = req.body
  let sql = `insert into deal_db(storeName,prdName,price,saleNum,createdDate,imgUrl,no,address,userID,prdID) values (?,?,?,?,?,?,?,?,?,?)`
  let sqlData = [data.storeName, data.prdName, data.price, data.saleNum, data.createdDate, data.imgUrl, data.no, data.address, data.userID, data.prdID]
  mysql.query(sql, sqlData, (err) => {
    if (err) {
      res.send({
        code: 0,
        msg: err
      })
      return
    }
    // 添加销量，减库存
    let sqlPrd = `SELECT *  FROM prd_db where prdID=${data.prdID}`
    mysql.query(sqlPrd, (err, prdList) => {
      if (err) {
        res.send({
          code: 0,
          msg: err
        })
        return
      }
      let prd = sqlFormat(prdList)[0]
      let sqlSetPrd = `update prd_db set saleNum=${prd.saleNum + data.saleNum},counts=${prd.counts - data.saleNum} where prdID=${data.prdID}`
      mysql.query(sqlSetPrd, (err, prdList) => {
        if (err) {
          res.send({
            code: 0,
            msg: err
          })
          return
        }
        res.send({
          code: 1,
          msg: '支付成功'
        })
      })
    })
  })
})

module.exports = router
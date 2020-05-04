const express = require('express')
const router = express()
const { mysql, sqlFormat } = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = ''
  let sqlData = []
  if (data.type === 'add') {
    sql = `insert into discuss_db (msg,date,prdID,userID,isBad,userName) values ('${data.msg}','${data.date}','${data.prdID}','${data.userID}','${data.isBad}','${data.userName}')`
  } else if (data.type === 'query') {
    if (data.userID && data.prdID) {
      sql = `select *  from discuss_db where userID=${data.userID} and prdID=${data.prdID}`
    } else {
      sql = `select *  from discuss_db where prdID=${data.prdID}`
    }
  } else if (data.type === 'update') {
    sql = `update discuss_db set storeMsg='${data.storeMsg}' where id=${data.id}`
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
    } else if (data.type === 'update') {
      res.send({
        code: 1,
        msg: '回复成功'
      })
    } else if (data.type === 'add') {
      // 查询商品
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
        // 更新评论
        let sql_deal = `update deal_db set discuss=${mysql.escape(data.msg)},isBad=${mysql.escape(data.isBad)} where userID=${data.userID} and prdID=${data.prdID} and id=${data.id}`
        console.log(data, 1)
        if (data.isBad == '0') {
          sql_deal += `;update prd_db set favourable=${prd.favourable + 1} where prdID=${data.prdID}`
        } else {
          sql_deal += `;update prd_db set harmful=${prd.harmful + 1} where prdID=${data.prdID}`
        }
        mysql.query(sql_deal, (err, result) => {
          if (err) {
            res.send({
              code: 0,
              msg: err.sqlMessage
            })
            return
          }
          res.send({
            code: 1,
            msg: '添加成功'
          })
        })
      })
    }

  })
})

module.exports = router
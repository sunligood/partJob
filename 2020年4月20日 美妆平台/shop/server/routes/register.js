const express = require('express')
const router = express.Router()
const { mysql, sqlFormat } = require('../mysql/index')

router.post('/', (req, res) => {
  let body = req.body
  let sqlVal = []
  let sql = ''
  if (body.userType === 1) {
    // 用户注册
    sqlVal = [body.userName, body.password, body.email]
    sql = `insert into user_db(userName,password,email) values (?,?,?)`
  } else if (body.userType === 2) {
    // 商户注册
    sqlVal = [body.userName, body.password, body.email, body.storeName, body.mobile, body.address]
    sql = `insert into user_db(userName,password,email,storeName,mobile,address) values (?,?,?,?,?,?)`
  }
  isRename(body.userName)
    .then(() => {
      mysql.query(sql, sqlVal, (err, result) => {
        if (err) {
          res.send({
            code: 0,
            msg: '注册失败'
          })
          return
        }
        res.send({
          code: 1,
          msg: '注册成功'
        })
      })
    })
    .catch(err => {
      res.send(err)
    })
})

// 检查是否重复
function isRename(userName) {
  return new Promise((resolve, reject) => {
    let sql = `select * from user_db where userName=${userName}`
    mysql.query(sql, (err, result) => {
      result = sqlFormat(result)
      if (err) {
        reject({
          code: 0,
          msg: '查询失败'
        })
        return
      }
      if (result.length !== 0) {
        reject({
          code: 0,
          msg: '用户名重复，请更换'
        })
        return
      }
      resolve(true)
    })
  })

}
module.exports = router
const express = require('express')
const router = express()
const {mysql} = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = `insert into user_db(name,password,sex,emp_no,root,systems,major,class,mobile,email,address) values (?,?,?,?,?,?,?,?,?,?,?)`
  let sqlData = [data.name, data.password, data.sex, data.emp_no, data.root, data.systems, data.major, data.class, data.mobile, data.email, data.address]
  mysql.query(sql, sqlData, (err) => {
    if (err) {
      res.send({
        code: 0,
        msg: err
      })
      return
    }
    res.send({
      code: 1,
      msg: '添加成功'
    })
  })
})

module.exports = router
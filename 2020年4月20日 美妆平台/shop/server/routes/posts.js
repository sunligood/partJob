const express = require('express')
const router = express()
const mysql = require('../mysql/index')
const fs = require('fs')
const marked = require('marked')

router.get('/', (req, res) => {
  res.render('posts')
})
router.get('/create', (req, res) => {
  fs.readFile(__dirname + '/a.json', (err, res) => {
    console.log(err)
    console.log(res.toString())
    // console.log(marked(res))
  })
  res.render('postsCreate')
})
router.post('/', (req, res) => {
  let data = req.body
  let sql = `insert into userInfo(username,email,phone,password) values (?,?,?,?)`
  let sqlData = [data.username, data.email, data.phone, data.password]
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
      msg: '登录成功'
    })
  })
})

module.exports = router
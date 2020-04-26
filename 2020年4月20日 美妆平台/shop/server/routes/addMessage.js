const express = require('express')
const router = express()
const {mysql, sqlFormat} = require('../mysql/index')

router.get('/', (req, res) => {
  res.render('signup')
})
router.post('/', (req, res) => {
  let data = req.body
  let sql = `insert into message_db(author,sex,mobile,email,content,createdDate,systems,major,class) values (?,?,?,?,?,?,?,?,?)`
  let sqlData = [data.author, data.sex, data.mobile, data.email,data.content, data.createdDate, data.systems, data.major,data.class]
  mysql.query(sql, sqlData, (err, result) => {
    result = sqlFormat(result)
    if (err) {
      res.send({
        code: 0,
        msg: err
      })
      return
    }
    res.send({
      code: 1,
      msg: '留言新增成功'
    })
  })
})

module.exports = router
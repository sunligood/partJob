const express = require('express')
const router = express()
const {mysql} = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let sql = ''
  if (!Array.isArray(data.imgID)) {
    sql = `delete from classalbum_db where imgID=${data.imgID}`
  } else {
    let model_sql = `delete from classalbum_db where imgID=?`
    // 拼接sql语句
    data.imgID.forEach((item, index)=>{
      sql += mysql.format(model_sql, item) + ';'
    })
  }
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
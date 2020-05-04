const express = require('express')
const router = express()
const { mysql } = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let setVal = '' //修改字段
  for (let key in data) {
    if (key !== 'userID' && key !== 'userType') {
      setVal += `${key}=${mysql.escape(data[key])},`
    }
  }
  setVal = setVal.substr(0, setVal.length - 1)
  let sql = `update user_db set ${setVal} where userID=${data.userID}`
  mysql.query(sql, (err) => {
    if (err) {
      res.send({
        code: 0,
        msg: err
      })
      return
    }
    res.set({
      'content-type': 'application/json; charset=utf-8'
    });
    res.send({
      code: 1,
      msg: '更新成功'
    })
  })
})

module.exports = router
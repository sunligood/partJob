const express = require('express')
const router = express()
const {mysql} = require('../mysql/index')

router.post('/', (req, res) => {
  let data = req.body
  let setVal = '' //修改字段
  if (data.type === 'stu') {
    //如果是学生修改个人信息，增加字段 爱好，个人说明
    // 管理员修改
    for (let key in data) {
      if (key !== 'userID' && key !== 'type') {
        setVal += `${key}=${mysql.escape(data[key])},`
      }
    }
    setVal = setVal.substr(0, setVal.length - 1)
  } else {
    // 管理员修改
    for (let key in data) {
      if (key !== 'userID') {
        setVal += `${key}=${mysql.escape(data[key])},`
      }
    }
    setVal = setVal.substr(0, setVal.length - 1)
   }
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
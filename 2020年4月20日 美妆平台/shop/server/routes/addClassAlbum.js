const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { mysql, sqlFormat } = require('../mysql/index')

const uploadPath = path.resolve('public', 'classAlbum')
router.post('/', multer({
  //设置文件存储路径
  dest: uploadPath   //upload文件如果不存在则会自己创建一个。
}).single('file'), (req, res) => {
  // 文件上传请求参数
  let data = JSON.parse(JSON.stringify(req.body))
  let file = req.file;
  // multer返回是字符串，需要转成文件名 oldfilename -> newfilename
  fs.renameSync(uploadPath + '/' + file.filename, uploadPath + '/' + file.originalname);
  let sql = `insert into classAlbum_db(url,author,systems,major,class,createdDate) values (?,?,?,?,?,?)`
  let sqlData = [`/public/classAlbum/${file.originalname}`, data.author, data.systems, data.major, data.class, data.createdDate]
  mysql.query(sql, sqlData, (err) => {
    if (err) {
      res.send({
        code: 0,
        msg: err
      })
      return
    }
    // 设置响应类型及编码
    res.set({
      'content-type': 'application/json; charset=utf-8'
    });
    res.send({
      code: 1,
      msg: '上传成功！'
    })
  })
})

module.exports = router
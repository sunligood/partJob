const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { mysql, sqlFormat } = require('../mysql/index')

const uploadPath = path.resolve('public', 'productImg')
router.post('/', multer({
  //设置文件存储路径
  dest: uploadPath   //upload文件如果不存在则会自己创建一个。
}).single('file'), (req, res) => {
  // 文件上传请求参数
  let body = JSON.parse(JSON.stringify(req.body))
  console.log(body)
  let file = req.file;
  // multer返回是字符串，需要转成文件名 oldfilename -> newfilename
  fs.renameSync(uploadPath + '/' + file.filename, uploadPath + '/' + file.originalname);
  let sql = `insert into prd_db(imgUrl,prdName,storeName,price,counts,unit,saleNum,favourable,harmful,createdDate) values (?,?,?,?,?,?,?,?,?,?)`
  let sqldata = [`/public/productImg/${file.originalname}`, body.prdName, body.storeName, body.price, body.counts, body.unit, body.saleNum, body.favourable, body.harmful, body.createdDate]
  // 修改商品
  if (body.isEdit) {
    let setVal = ''
    for (let key in body) {
      if (key !== 'imgUrl' && key !== 'prdID' && key !== 'isEdit') {
        setVal += `${key}=${mysql.escape(body[key])},`
      }
    }
    setVal += `imgUrl='/public/productImg/${file.originalname}'`
    console.log(setVal)
    sql = `update prd_db set ${setVal} where prdID=${body.prdID}`
  }
  mysql.query(sql, sqldata, (err) => {
    if (err) {
      res.send({
        code: 0,
        msg: err.sqlMessage
      })
      return
    }
    // 设置响应类型及编码
    res.set({
      'content-type': 'application/json; charset=utf-8'
    });
    res.send({
      code: 1,
      msg: body.isEdit ? '编辑成功' : '添加成功'
    })
  })
})

module.exports = router
module.exports = function (app) {
  // 登录
  app.use('/login', require('./login'))
  // 用户注册（管理员权限）
  app.use('/addStu', require('./addStu'))
  // 查询用户
  app.use('/queryStu', require('./queryStu'))
  // 用户信息修改
  app.use('/updateStu', require('./updateStu'))
  // 用户信息修改
  app.use('/deleteStu', require('./deleteStu'))

  // 新增留言
  app.use('/addMessage', require('./addMessage'))
  // 查询留言
  app.use('/queryMessage', require('./queryMessage'))
  // 更新留言
  app.use('/updateMessage', require('./updateMessage'))
  // 删除留言
  app.use('/deleteMessage', require('./deleteMessage'))

  // 相册上传
  app.use('/addClassAlbum', require('./addClassAlbum'))
  // 相册查询
  app.use('/queryClassAlbum', require('./queryClassAlbum'))
  // 相册查询
  app.use('/deleteClassAlbum', require('./deleteClassAlbum'))
  // 个人头像上传
  app.use('/personalImg', require('./personalImg'))
}
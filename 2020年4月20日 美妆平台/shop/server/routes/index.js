module.exports = function (app) {
  // 登录
  app.use('/login', require('./login'))
  // 注册
  app.use('/register', require('./register'))
  // 查询用户
  app.use('/queryUser', require('./queryUser'))
  // 更新用户
  app.use('/updateUser', require('./updateUser'))

  // 新增商品
  app.use('/addPrd', require('./addPrd'))
  // 查询商品
  app.use('/queryPrd', require('./queryPrd'))
  // 下架商品
  app.use('/deletePrd', require('./deletePrd'))

  // 查询商品交易
  app.use('/queryDeal', require('./queryDeal'))
  // 新增商品交易
  app.use('/addDeal', require('./addDeal'))
  // 删除商品交易
  app.use('/deleteDeal', require('./deleteDeal'))

  // 商品评价
  app.use('/discuss', require('./discuss'))

  // 商品分享
  app.use('/share', require('./share'))









  // 个人头像上传
  app.use('/personalImg', require('./personalImg'))
}
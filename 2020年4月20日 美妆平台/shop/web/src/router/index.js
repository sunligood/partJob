import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  // 登录模块
  { path: '/login/:type', name: 'Login', component: () => import('../views/Login.vue') },
  // 注册模块
  { path: '/register/:type', name: 'Register', component: () => import('../views/Register.vue') },
  // 商品列表
  { path: '/store/:keys', name: 'Store', component: () => import('../views/store/Store.vue') },
  // 商品详情
  { path: '/goods/:id', name: 'Goods', component: () => import('../views/store/Goods.vue') },
  // 购物车
  { path: '/shopCar', name: 'ShopCar', component: () => import('../views/store/ShopCar.vue') },
  // 结算页面
  { path: '/dopay', name: 'Dopay', component: () => import('../views/Dopay.vue') },
  // 后台管理员-首页
  {
    path: '/admin/home', name: 'AdminHome', component: () => import('../views/backstage/admin/Home.vue'),
    children: [
      { path: '/admin/product', name: 'AdminProduct', component: () => import('../views/backstage/admin/Product.vue') },
      { path: '/admin/user', name: 'AdminUser', component: () => import('../views/backstage/admin/User.vue') },
      { path: '/admin/store', name: 'AdminStore', component: () => import('../views/backstage/admin/StoreMent.vue') }
    ]
  },
  // 后台商铺-首页
  {
    path: '/merchant/home', name: 'MerchantHome', component: () => import('../views/backstage/merchant/Home.vue'),
    children: [
      { path: '/merchant/product', name: 'MerchantProduct', component: () => import('../views/backstage/merchant/Product.vue') },
      { path: '/merchant/user', name: 'MerchantUser', component: () => import('../views/backstage/merchant/User.vue') },
      { path: '/merchant/list', name: 'MerchantList', component: () => import('../views/backstage/merchant/List.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

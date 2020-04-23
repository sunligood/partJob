import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  // 登录模块
  { path: '/login/:type', name: 'Login', component: () => import('../views/login/Login.vue') },
  // 注册模块
  { path: '/register/:type', name: 'Register', component: () => import('../views/register/Register.vue') },
  // 商品列表
  { path: '/store/:keys', name: 'Store', component: () => import('../views/store/Store.vue') },
  // 商品详情
  { path: '/goods/:id', name: 'Goods', component: () => import('../views/store/Goods.vue') },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') }
]

const router = new VueRouter({
  routes
})

export default router

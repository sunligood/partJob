import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/posts",
    name: "Posts",
    component: () => import(/* webpackChunkName: "about" */ "../views/Posts.vue"),
  },
  {
    path: "/msg",
    name: "Msg",
    component: () => import(/* webpackChunkName: "about" */ "../views/Msg.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

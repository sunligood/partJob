import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/face/home/home'
import Posts from '@/components/face/posts'
import PostsList from '@/components/face/postsList'
import About from '@/components/face/about'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/home',
            component: Home,
            meta: { title: '首页' }
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/allUser',
                    component: resolve => require(['../components/page/admin/allUser.vue'], resolve),
                    meta: { title: '所有用户' }
                },
                {
                    path: '/addUsers',
                    component: resolve => require(['../components/page/admin/addUsers.vue'], resolve),
                    meta: { title: '添加用户' }
                },
                {
                    path: '/photos',
                    component: resolve => require(['../components/page/admin/photos.vue'], resolve),
                    meta: { title: '班级相册' }
                },
                {
                    path: '/messages',
                    component: resolve => require(['../components/page/admin/messages.vue'], resolve),
                    meta: { title: '消息管理' }
                },
                {
                    path: '/userClass',
                    component: resolve => require(['../components/page/user/userClass.vue'], resolve),
                    meta: { title: '班级' }
                },
                {
                    path: '/leavingMsg',
                    component: resolve => require(['../components/page/user/leavingMsg.vue'], resolve),
                    meta: { title: '班级留言' }
                },
                {
                    path: '/classCommunication',
                    component: resolve => require(['../components/page/user/classCommunication.vue'], resolve),
                    meta: { title: '班级通讯' }
                },
                {
                    path: '/classPicture',
                    component: resolve => require(['../components/page/user/classPicture.vue'], resolve),
                    meta: { title: '班级相册' }
                },
                {
                    // 富文本编辑器组件
                    path: '/userInfo',
                    component: resolve => require(['../components/page/user/userInfo.vue'], resolve),
                    meta: { title: '个人信息' }
                },
                {
                    // 富文本编辑器组件
                    path: '/changePwd',
                    component: resolve => require(['../components/page/user/changePwd.vue'], resolve),
                    meta: { title: '修改密码' }
                },
                {
                    // 富文本编辑器组件
                    path: '/ownPeace',
                    component: resolve => require(['../components/page/user/ownPeace.vue'], resolve),
                    meta: { title: '个人空间' }
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        },
        {
            path: '/posts',
            component: Posts,
            meta: { title: '首页' }
        },
        {
            path: '/postsList',
            component: PostsList,
            meta: { title: '首页' }
        },
        {
            path: '/about',
            component: About,
            meta: { title: '首页' }
        },
    ]
})

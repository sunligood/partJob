<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="logoImg">
      <img src="../../../assets/img/logo.jpg" alt />
    </div>
    <div class="logo">海滨学院校友录</div>
    <div class="header-nav">
      <ul>
        <li @click="goUrl('/home')">首页</li>
        <li @click="goUrl('/postsList')">新闻动态</li>
        <li @click="goUrl('/about')">关于学校</li>
      </ul>
    </div>
    <div class="header-right">
      <div class="header-user-con" v-if="!username">
        <a href="javascript: void(0)" class="loginBtn" @click="toLogin()">登录</a>
      </div>
      <div class="header-user-con" v-else :class="{fnHide: !username}">
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand" v-if="username">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user">{{root == 1 ? '班级管理' : '班级中心'}}</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      name: '',
      message: 2
    }
  },
  computed: {
    username() {
      let username = sessionStorage.getItem('name')
      return username ? username : this.name
    },
    root() {
      let root = sessionStorage.getItem('root')
      return root === undefined ? 0 : root
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('ms_username')
        sessionStorage.removeItem('name')
        this.$router.push('/login')
      } else if (command == 'user') {
        // 后台
        // if (this.root != 1) this.$router.push({ path: '/userClass' })
        if (this.root != 1) this.$router.push({ path: '/classCommunication' })
        else this.$router.push({ path: '/allUser' })
      }
    },
    toLogin() {
      this.$router.push({ path: '/login' })
    },
    goUrl(url) {
      this.$router.push({ path: url })
    }
  }
}
</script>
<style scoped>
.header {
  background-color: #0577c0 !important;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.logoImg {
  float: left;
  padding: 0 21px;
  line-height: 70px;
}
.logoImg img {
  width: 50px;
  vertical-align: middle;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
  font-size: 18px;
}
.header-nav {
  position: absolute;
  right: 110px;
  height: 70px;
  line-height: 70px;
  font-size: 15px;
}
.header-nav ul {
  list-style: none;
}
.header-nav ul li {
  float: left;
  padding: 0 10px;
  cursor: pointer;
}
.header-nav ul li:hover {
  text-decoration: underline;
}
.header-right {
  float: right;
  padding-right: 20px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.collapse-btn:hover {
  background-color: #009688 !important;
}
.loginBtn {
  padding: 5px 20px;
  border-radius: 10px;
  background-color: #fff;
  color: #0577c0;
  font-size: 15px;
}
</style>

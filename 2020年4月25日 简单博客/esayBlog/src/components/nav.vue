<template>
  <div class="nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">关于</el-menu-item>
      <el-menu-item index="3">学习</el-menu-item>
      <el-menu-item index="4">留言</el-menu-item>
    </el-menu>
    <div style="color:#fff;cursor: pointer;">
      <span @click="goLogin">{{name}}</span>
      <span style="margin-left: 10px;" v-if="name !== '登录'" @click="loginOut">退出</span>
    </div>
  </div>
</template>

<script>
import Posts from '../assets/posts.json'
export default {
  name: 'Home',
  props: {
    activeIndex: {
      type: String,
      default: () => {
        return '1'
      }
    }
  },
  data() {
    return {
      name: '登录'
    }
  },
  mounted() {
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    if (userInfo) {
      this.name = '欢迎,' + userInfo.name
    }
  },
  methods: {
    goLogin() {
      if (this.name !== '登录') {
        return
      }
      this.$router.push({ name: 'Login', params: { url: '/' } })
    },
    loginOut() {
      window.localStorage.removeItem('userInfo')
      this.$router.push({ name: 'Login', params: { url: '/' } })
    },
    handleSelect(index) {
      switch (index) {
        case '1':
          this.$router.push('/')
          break
        case '4':
          this.$router.push('/msg')
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background: rgb(84, 92, 100);
}
</style>

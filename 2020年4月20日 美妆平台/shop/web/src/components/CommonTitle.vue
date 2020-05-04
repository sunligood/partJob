<template>
  <div class="common-title">
    <div class="c-main">
      <a v-if="!isLogin" @click="login" href="javascript:;">{{title}}</a>
      <span v-else>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎，{{userInfo.userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      title: '请先登录',
      userInfo: this.$store.state.userInfo
    }
  },
  methods: {
    login() {
      this.$router.push('/login/1')
    },
    handleCommand(command) {
      if (command === 'user') {
        this.$router.push('/user/center')
      } else if (command === 'loginout') {
        this.$router.push('/login/1')
        this.$store.state.userInfo = null
        this.$store.state.shopCar = null
      }
    }
  },
  mounted() {
    if (this.userInfo) {
      this.isLogin = true
    }
  }
}
</script>

<style lang="scss">
.common-title {
  line-height: 30px;
  background-color: #e3e4e5;
  .el-dropdown-link {
    cursor: pointer;
    color: #999;
    font-size: 12px;
    &:hover {
      color: #409eff;
    }
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .c-main {
    margin: 0 auto;
    max-width: 800px;
    text-align: right;
    font-size: 12px;
    cursor: pointer;
    a {
      color: #999;
      text-decoration: none;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
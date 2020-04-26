<template>
  <div class="login">
    <div style="text-align:right;padding:10px">
      <el-button type="success" @click="changePage('/login/1')">用户登录</el-button>
      <el-button type="success" @click="changePage('/login/2')">商户登录</el-button>
      <el-button type="success" @click="changePage('/login/3')">管理员登录</el-button>
    </div>
    <div class="c-mian">
      <h1>{{title}}</h1>
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
      <el-input v-model="password" :type="'password'" placeholder="请输入密码"></el-input>
      <el-button type="success" @click="submit">登录</el-button>
      <router-link
        v-if="loginType !== '3'"
        class="register"
        :to="{path: '/register/'+ loginType}"
      >立即注册</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '登录', //标题
      loginType: '1', // 登录类型 1用户， 2商户， 3管理员
      username: '', // 登录用户名
      password: '' // 登录密码
    }
  },
  created() {
    this.setType()
  },
  methods: {
    submit() {
      switch (this.loginType) {
        case '1':
          this.title = '登录'
          this.$router.push({ path: '/' })
          break
        case '2':
          this.$router.push({ path: '/merchant/home', params: { type: 2 } })
          break
        case '3':
          this.$router.push({ path: '/admin/home', params: { type: 3 } })
          break
        default:
          this.title = '登录'
          break
      }
    },
    changePage(url) {
      this.$router.push(url)
      this.setType()
    },
    setType() {
      let routeParams = this.$route.params
      this.loginType = routeParams.type
      switch (this.loginType) {
        case '1':
          this.title = '登录'
          break
        case '2':
          this.title = '商户登录'
          break
        case '3':
          this.title = '管理员登录'
          break
        default:
          this.title = '登录'
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #409eff;
  .c-mian {
    position: absolute;
    top: 40%;
    left: 50%;
    width: 300px;
    transform: translate(-50%, -50%);
    h1 {
      margin-bottom: 40px;
      font-size: 24px;
      color: #fff;
    }
    .el-input {
      margin: 10px 0;
    }
    .el-button {
      margin-top: 20px;
      width: 100%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    .register {
      display: block;
      text-align: right;
      margin-top: 10px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>

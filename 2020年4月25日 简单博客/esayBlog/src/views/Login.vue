<template>
  <div class="login">
    <div class="c-mian">
      <h1>{{title}}</h1>
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
      <el-input v-model="password" :type="'password'" placeholder="请输入密码"></el-input>
      <el-button type="success" @click="submit">登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '登录', //标题
      username: '', // 登录用户名
      password: '' // 登录密码
    }
  },
  created() {},
  methods: {
    submit() {
      if (!this.username || !this.password) {
        this.$message.error('错了哦，这是一条错误消息')
      } else {
        let userInfo = { name: this.username, password: this.password }
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
        let params = this.$route.params
        if (params && params.url) {
          this.$router.push(params.url)
        } else {
          this.$router.push('/')
        }
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
  }
}
</style>

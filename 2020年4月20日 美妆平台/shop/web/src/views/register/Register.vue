<template>
  <div class="login">
    <i class="el-icon-back" @click="back"></i>
    <div class="c-mian">
      <h1>{{title}}</h1>
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
      <el-input v-if="registerType == '2'" v-model="storeName" placeholder="请输入商铺名"></el-input>
      <el-input v-if="registerType == '2'" v-model="phone" placeholder="联系电话"></el-input>
      <el-input v-if="registerType == '2'" v-model="address" placeholder="地址"></el-input>
      <el-input v-model="email" placeholder="请输入邮箱"></el-input>
      <el-input v-model="password" :type="'password'" placeholder="请输入密码"></el-input>
      <el-button type="success">注册</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '注册', //标题
      registerType: '1', // 登录类型 1用户， 2商户
      username: "", // 登录用户名
      email: "", // 邮箱
      phone: "", // 电话
      storeName: "", // 商铺名
      address: "", // 地址
      password: "" // 登录密码
    }
  },
  mounted () {
    let route = this.$route.params
    this.registerType = route.type
    this.registerType === '2' ? this.title = '商户注册' : this.title = '注册'
  },
  methods: {
    back () {
      this.$router.back()
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
  background-color: #409EFF;
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
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .register {
      display: block;
      text-align: right;
      margin-top: 10px;
      color: #fff;
      cursor: pointer;
    }
  }
  .el-icon-back {
    position: fixed;
    left: 10px;
    top: 10px;
    color: #fff;
    font-size: 30px;
  }
}
</style>

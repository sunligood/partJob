<template>
  <div class="login">
    <i class="el-icon-back" @click="back"></i>
    <div class="c-mian">
      <h1>{{title}}</h1>
      <el-input v-model="userName" placeholder="请输入用户名"></el-input>
      <el-input v-if="registerType == '2'" v-model="storeName" placeholder="请输入商铺名"></el-input>
      <el-input v-if="registerType == '2'" v-model="mobile" placeholder="联系电话"></el-input>
      <el-input v-if="registerType == '2'" v-model="address" placeholder="地址"></el-input>
      <el-input v-model="email" placeholder="请输入邮箱"></el-input>
      <el-input v-model="password" :type="'password'" placeholder="请输入密码"></el-input>
      <el-button type="success" @click="sumbit">注册</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '注册', //标题
      registerType: '1', // 登录类型 1用户， 2商户
      userName: '', // 登录用户名
      email: '', // 邮箱
      mobile: '', // 电话
      storeName: '', // 商铺名
      address: '', // 地址
      password: '' // 登录密码
    }
  },
  mounted() {
    let route = this.$route.params
    this.registerType = route.type
    this.registerType === '2'
      ? (this.title = '商户注册')
      : (this.title = '注册')
  },
  methods: {
    sumbit() {
      let params = {
        userType: this.registerType, // 登录类型 1用户， 2商户
        userName: this.userName, // 登录用户名
        email: this.email, // 邮箱
        mobile: this.mobile, // 电话
        storeName: this.storeName, // 商铺名
        address: this.address, // 地址
        password: this.password, // 登录密码
        isAuthority: '1',
        money: 99999
      }
      if (!params.userName || !params.email || !params.password) {
        this.$message.error('请填写完整信息')
        return
      }
      if (
        params.userType === '2' &&
        (!params.mobile || !params.storeName || !params.address)
      ) {
        this.$message.error('请填写完整信息')
        return
      }
      if (!this.checkPhone(params.mobile)) {
        this.$message.error('手机号码格式错误')
        return
      }
      if (!this.checkEmail(params.email)) {
        this.$message.error('邮箱格式错误')
        return
      }
      this.$axios
        .post('/register', params)
        .then(res => {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          })
          this.$router.push({ path: `/login/${params.userType}` })
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    checkEmail(value) {
      if (!value) {
        return true
      }
      if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
      ) {
        return false
      } else {
        return true
      }
    },
    checkPhone(value) {
      if (!value) {
        return true
      }
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return false
      } else {
        return true
      }
    },
    back() {
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
  .el-icon-back {
    position: fixed;
    left: 10px;
    top: 10px;
    color: #fff;
    font-size: 30px;
  }
}
</style>

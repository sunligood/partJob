<template>
  <div class="admin-home" v-if="userInfo">
    <div class="header">
      <h1>美妆平台后台管理系统-商铺</h1>
      <div class="r">
        <span>欢迎, {{userInfo.userName}}</span>
        <span @click="back">退出</span>
      </div>
    </div>
    <el-row class="tac">
      <el-col :span="1">
        <el-menu
          default-active="1"
          class="el-menu-vertical"
          @select="select"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <div class="children-c">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminHome',
  data() {
    return {
      userInfo: this.$store.state.userInfo
    }
  },
  created() {
    if (!this.userInfo) {
      this.$router.push('/login/2')
      this.$message.error('请先登录')
    } else {
      this.$router.replace('/merchant/user')
    }
  },
  methods: {
    back() {
      this.$router.push('/login/2')
      this.$store.state.userInfo = null
    },
    select(index) {
      console.log(index)
      switch (index) {
        case '1':
          this.$router.push('/merchant/user')
          break
        case '2':
          this.$router.push('/merchant/product')
          break
        case '3':
          this.$router.push('/merchant/list')
          break
        default:
          break
      }
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.admin-home {
  .header {
    z-index: 100;
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    background-color: #304156;
    color: #fff;
    .r {
      font-size: 14px;
      span:last-child {
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
        &:hover {
          opacity: 0.6;
        }
      }
    }
    .el-link--inner {
      color: #fff;
    }
  }
  .el-menu-vertical {
    position: fixed;
    top: 56px;
    width: 150px;
    height: 100%;
  }
  .children-c {
    width: calc(100% - 150px);
    margin-left: 150px;
    margin-top: 30px;
  }
}
</style>
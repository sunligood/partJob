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
          :default-active="active"
          class="el-menu-vertical"
          @select="select"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="3">
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
      userInfo: this.$store.state.userInfo,
      active: '1'
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
      this.$store.state.shopCar = null
    },
    select(index) {
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
  watch: {},
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
    padding: 20px 0;
    background-color: #304156;
    color: #fff;
    h1 {
      padding: 0 25px;
    }
    .r {
      font-size: 14px;
      padding: 0 30px;
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
    overflow: auto;
    position: absolute;
    left: 150px;
    right: 0;
    top: 56px;
    bottom: 0;
    padding-bottom: 30px;
    background: #f0f0f0;
  }
}
</style>
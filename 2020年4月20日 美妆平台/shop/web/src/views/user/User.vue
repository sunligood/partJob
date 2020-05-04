<template>
  <div class="user">
    <common-title></common-title>
    <div class="c-main">
      <main-header :title="'用户中心'"></main-header>
      <el-row class="tac">
        <el-col :span="3">
          <el-menu default-active="1" class="el-menu-vertical" @select="select">
            <el-menu-item index="1">
              <span slot="title">我的主页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">我的订单</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <div class="children-c">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTitle from '../../components/CommonTitle'
import MainHeader from '../../components/MainHeader'
export default {
  name: 'User',
  data() {
    return {}
  },
  methods: {
    select(index) {
      switch (index) {
        case '1':
          this.$router.push('/user/center')
          break
        case '2':
          this.$router.push('/user/order')
          break
        default:
          break
      }
    }
  },
  components: {
    CommonTitle,
    MainHeader
  }
}
</script>
<style lang="scss" scoped>
.user {
  .c-main {
    margin: 0 auto;
    width: 800px;
  }
  .shop {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 50px;
    i {
      color: #409eff;
    }
  }
  .el-menu {
    position: fixed;
    width: 150px;
    height: 100%;
  }
  .children-c {
    margin-left: 150px;
    padding-left: 20px;
  }
}
</style>
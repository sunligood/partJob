<template>
  <div class="admin-home">
    <div class="header">
      <h1>美妆平台后台管理系统-商铺</h1>
      <span>欢迎，sunli</span>
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
      goodsKey: '', //商品关键词
      goodsList: [] // 商品列表数据
    }
  },
  created() {
    this.$router.push('/merchant/user')
  },
  methods: {
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
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    background-color: #304156;
    color: #fff;
  }
  .el-menu-vertical {
    position: fixed;
    width: 150px;
    height: 100%;
  }
  .children-c {
    width: calc(100% - 150px);
    margin-left: 150px;
  }
}
</style>
<template>
  <div class="shop-car">
    <common-title></common-title>
    <div class="c-main">
      <main-header title="购物车"></main-header>
      <el-divider></el-divider>
      <div class="p-list">
        <div v-for="items in 4" :key="items">
          <div class="p-item">
            <img src="../../assets/goods1.png" width="100px" height="100px" />
            <p class="name">内存条，金士顿，十全 2666</p>
            <p class="price">&yen;200.00{{items}}</p>
            <p class="count">x1</p>
            <el-link type="danger" @click="remove">删除</el-link>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
      <div class="bottom">
        <span>总价： 2000元</span>
        <el-button type="primary" @click="dopay">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTitle from '../../components/CommonTitle'
import MainHeader from '../../components/MainHeader'
export default {
  name: 'ShopCar',
  data() {
    return {
      address: ''
    }
  },
  created() {
    let routeParams = this.$route.params
    if (routeParams.keys === 'all') {
      this.goodsKey = ''
    } else if (routeParams.keys) {
      this.goodsKey = routeParams.keys
    }
  },
  methods: {
    // 支付
    dopay() {
      this.$router.push('/doPay')
    },
    // 删除订单
    remove() {
      this.$confirm('是否删除改商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  components: {
    CommonTitle,
    MainHeader
  }
}
</script>
<style lang="scss" scoped>
.shop-car {
  .c-main {
    margin: 0 auto;
    max-width: 800px;
    .p-list {
      .p-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          flex: 0.5;
          font-size: 14px;
        }
        .price {
          flex: 0.2;
          color: #333;
          font-weight: 700;
        }
        .count {
          font-size: 14px;
        }
      }
    }
    .bottom {
      margin-top: 20px;
      text-align: right;
      span {
        margin-right: 50px;
        font-size: 14px;
      }
    }
  }
}
</style>
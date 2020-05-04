<template>
  <div class="shop-car">
    <common-title></common-title>
    <div class="c-main">
      <main-header title="购物车"></main-header>
      <el-divider></el-divider>
      <div class="p-list" v-if="list.length">
        <div v-for="(items, index) in list" :key="index" @click="goGoods(items.prdID)">
          <div class="p-item">
            <img :src="items.imgUrl" width="100px" height="100px" />
            <p class="name">{{items.prdName}}</p>
            <p class="price">&yen;{{items.price}}</p>
            <p class="count">x{{items.buyCount}}</p>
            <el-link type="danger" @click.stop="remove(index)">删除</el-link>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
      <div v-if="!list.length && userInfo" style="padding:150px 0;text-align:center">
        <i class="el-icon-shopping-cart-2" style="display:block;font-size:50px"></i>
        <el-link href="http://localhost:8080/#/store/all">空空如也~ 去购物吧</el-link>
      </div>
      <div v-if="!userInfo" style="padding:150px 0;text-align:center">
        <i class="el-icon-shopping-cart-2" style="display:block;font-size:50px"></i>
        <el-link href="http://localhost:8080/#/login/1">亲~ 请先登录</el-link>
      </div>
      <div v-if="list.length" class="bottom">
        <span>总价： {{sumPrice}}元</span>
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
      address: '',
      list: this.$store.state.shopCar,
      userInfo: this.$store.state.userInfo
    }
  },
  computed: {
    sumPrice() {
      if (this.list) {
        let sum = 0
        this.list.forEach(item => {
          sum = sum + Number(item.price) * Number(item.buyCount)
        })
        return sum.toFixed(2)
      }
      return 0
    }
  },
  created() {},
  methods: {
    // 支付
    dopay() {
      this.$store.state.payList = this.list
      this.$router.push('/doPay')
    },
    // 删除订单
    remove(index) {
      this.$confirm('是否删除改商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$store.state.shopCar.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {})
    },
    goGoods(id) {
      this.$router.push('/goods/' + id)
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
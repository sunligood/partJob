<template>
  <div class="main-header">
    <div class="main-title">
      <div class="h1">
        <h1 class="title" @click="$router.push('/')">美妆平台</h1>
        <span>{{title}}</span>
      </div>
      <div class="search">
        <input type="text" v-model="goodsKey" placeholder="请输入商品" />
        <div class="search-btn" @click="search">搜索</div>
      </div>
      <div class="shop-car" @click="goCar">
        <span class="count">{{shopCarCount}}</span>
        <i class="el-icon-shopping-cart-2"></i>
        <span class="text">我的购物车</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    }
  },
  computed: {
    shopCarCount() {
      return this.$store.state.shopCar.length
    }
  },
  data() {
    return {
      goodsKey: ''
    }
  },
  methods: {
    search() {
      if (this.goodsKey === '') {
        return
      }
      this.$emit('search', this.goodsKey)
      this.$router.push('/store/' + this.goodsKey)
    },
    goCar() {
      this.$router.push('/shopCar')
    }
  }
}
</script>
<style lang="scss" scoped>
.main-header {
  margin-bottom: 40px;
  .main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    .h1 {
      display: flex;
      align-items: flex-end;
      span {
        margin-left: 10px;
        font-size: 14px;
      }
    }
    .title {
      font-size: 35px;
      color: #409eff;
      cursor: pointer;
    }
    .search {
      flex: 0.7;
      display: flex;
      align-items: center;
      border: 2px solid #409eff;
      .search-btn {
        width: 50px;
        padding: 0 10px;
        line-height: 33px;
        text-align: center;
        background-color: #409eff;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
      }
      input {
        width: 100%;
        height: 26px;
        border: 0;
        outline: none;
        padding-left: 10px;
      }
    }
    .shop-car {
      position: relative;
      width: 120px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border: 1px solid #eee;
      cursor: pointer;
      span {
        font-size: 14px;
        color: #409eff;
      }
      .el-icon-shopping-cart-2 {
        font-size: 20px;
      }
      .count {
        position: absolute;
        left: 23px;
        top: 2px;
        width: 14px;
        height: 14px;
        line-height: 14px;
        border-radius: 50%;
        background-color: #409eff;
        font-size: 12px;
        color: #fff;
      }
      .text {
        margin-left: 10px;
      }
    }
  }
}
</style>
<template>
  <div class="store">
    <common-title></common-title>
    <div class="c-main">
      <div class="main-title">
        <h1 class="title">美妆平台</h1>
        <div class="search">
          <input type="text" v-model="goodsKey" placeholder="请输入商品" />
          <div class="search-btn">搜索</div>
        </div>
        <div class="shop-car">
          <span class="count">1</span>
          <i class="el-icon-shopping-cart-2"></i>
          <span class="text">我的购物车</span>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in 10" :key="item">
          <div class="grid-content bg-purple">
            <div class="img">
              <img src="../../assets/goods1.png" width="160px" />
            </div>
            <p class="price">&yen;2000.00</p>
            <p class="title">这是商品描述这是商品描述这是商品描述这是商品描述</p>
            <p class="evaluate">
              已有
              <b>11</b>人评价
            </p>
            <p class="shop">神秘商铺</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CommonTitle from '../../components/CommonTitle'
export default {
  name: 'Store',
  data() {
    return {
      goodsKey: '', //商品关键词
      goodsList: [] // 商品列表数据
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
  methods: {},
  components: {
    CommonTitle
  }
}
</script>
<style lang="scss" scoped>
.store {
  .c-main {
    margin: 0 auto;
    width: 800px;
    .main-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      .title {
        font-size: 35px;
        color: #409eff;
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
      .shop-car:hover {
        border-color: #409eff;
      }
    }
    .grid-content {
      height: 280px;
      padding: 10px;
      border: 1px solid #fff;
      cursor: pointer;
      transition: border-color 0.2s ease;
      .img {
        text-align: center;
      }
      .price {
        padding: 5px 0;
        color: #e4393c;
        font-size: 20px;
      }
      .title {
        color: #666;
        font-size: 12px;
      }
      .evaluate {
        color: #a7a7a7;
        font-size: 12px;
        padding: 5px 0;
        b {
          font-weight: bold;
          color: #646fb0;
        }
      }
      .shop {
        color: #a7a7a7;
        font-size: 12px;
      }
    }
    .grid-content:hover {
      border-color: #e9e9e9;
      box-shadow: 0 0 2px 2px #f8f8f8;
    }
  }
}
</style>
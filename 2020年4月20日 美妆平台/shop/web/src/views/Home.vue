<template>
  <div class="home">
    <common-title></common-title>
    <div class="c-main">
      <div class="main-title">
        <h1 class="title">美妆平台</h1>
        <div class="search">
          <!-- <el-input v-model="goodsKey" placeholder="请输入商品"></el-input> -->
          <input type="text" v-model="goodsKey" placeholder="请输入商品">
          <div class="search-btn">搜索</div>
        </div>
        <div class="shop-car">
          <span class="count">1</span>
          <i class="el-icon-shopping-cart-2"></i>
          <span class="text">我的购物车</span>
        </div>
      </div>
      <div class="banner">
        <el-carousel trigger="click" height="400px">
          <el-carousel-item v-for="item in banner" :key="item">
            <img :src="item" width="800px">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTitle from '../components/CommonTitle'
export default {
  name: 'Home',
  data () {
    return {
      banner: [require('../assets/banner/1.webp'), require('../assets/banner/2.webp'), require('../assets/banner/3.webp'), require('../assets/banner/4.webp')],
      goodsKey: '', //商品关键词
    }
  },
  components: {
    CommonTitle
  }
}
</script>
<style lang="scss" scoped>
  .home {
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
          color: #409EFF;
        }
        .search {
          flex: .7;
          display: flex;
          align-items: center;
          border: 2px solid #409EFF;
          .search-btn {
            width: 50px;
            padding: 0 10px;
            line-height: 33px;
            text-align: center;
            background-color: #409EFF;
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
            color: #409EFF;
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
            background-color: #409EFF;
            font-size: 12px;
            color: #fff;
          }
          .text {
            margin-left: 10px;
          }
        }
        .shop-car:hover {
          border-color: #409EFF;
        }
      }
    }
  }
</style>
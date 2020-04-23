<template>
  <div class="goods">
    <common-title></common-title>
    <div class="c-main">
      <main-header></main-header>
      <div class="grid-content bg-purple">
        <div class="img">
          <img src="../../assets/goods1.png" width="260px" />
        </div>
        <div class="detail">
          <p class="title">这是商品描述这是商品描述这是商品描述这是商品描述</p>
          <div class="price">
            <span>价&nbsp;格：</span>
            <sub>&yen;</sub>2000.00
          </div>
          <div class="text-item">
            <span>库&nbsp;存：</span>10000
          </div>
          <div class="text-item">
            <span>评&nbsp;价：</span>2000.00
          </div>
          <div class="text-item">
            <span>店&nbsp;铺：</span>神秘商铺
          </div>
          <el-input-number v-model="buyCount" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          <el-button>加入购物车</el-button>
          <el-button type="primary">立即购买</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTitle from '../../components/CommonTitle'
import MainHeader from '../../components/MainHeader'
export default {
  name: 'Goods',
  data() {
    return {
      buyCount: 1, // 购买数量
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
  methods: {
    handleChange () {

    }
  },
  components: {
    CommonTitle,
    MainHeader
  }
}
</script>
<style lang="scss" scoped>
.goods {
  .c-main {
    margin: 0 auto;
    width: 800px;
    .grid-content {
      margin-top: 100px;
      display: flex;
      justify-content: end;
      .img {
        padding: 30px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #eee;
        transition: border-color 0.2s ease;
      }
      .img:hover {
        border-color: #e9e9e9;
        box-shadow: 0 0 2px 2px #f8f8f8;
      }
      .detail {
        margin-left: 20px;
        .title {
          color: #666;
          font-size: 20px;
          letter-spacing: 1px;
        }
        .price {
          padding: 10px 0;
          color: #e4393c;
          font-size: 20px;
          span {
            font-size: 12px;
            color: #a7a7a7;
          }
          sub {
            font-size: 12px;
          }
        }
        .text-item {
          padding: 10px 0;
          color: #a7a7a7;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
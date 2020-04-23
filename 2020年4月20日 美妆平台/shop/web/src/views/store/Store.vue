<template>
  <div class="store">
    <common-title></common-title>
    <div class="c-main">
      <main-header title="商品列表"></main-header>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in 10" :key="item" @click.native="goGoods(item)">
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
import MainHeader from '../../components/MainHeader'
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
  methods: {
    goGoods (id) {
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
.store {
  .c-main {
    margin: 0 auto;
    max-width: 800px;
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
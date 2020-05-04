<template>
  <div class="store">
    <common-title></common-title>
    <div class="c-main">
      <main-header title="商品列表" @search="search"></main-header>
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="(item, index) in goodsList"
          :key="index"
          @click.native="goGoods(item.prdID)"
        >
          <div class="grid-content bg-purple">
            <div class="img">
              <img :src="item.imgUrl" width="160px" height="160px" />
            </div>
            <p class="price">&yen;{{item.price.toFixed(2)}}</p>
            <p class="title">{{item.detail}}</p>
            <p class="evaluate">
              已有
              <b>{{item.favourable + item.harmful}}</b>人评价
            </p>
            <p class="shop">
              <i class="el-icon-s-shop"></i>
              {{item.storeName}}
            </p>
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
    this.queryPrd()
  },
  methods: {
    search(goodsKey) {
      this.goodsKey = goodsKey
      this.queryPrd()
    },
    queryPrd() {
      this.$axios.post('/queryPrd', { keywords: this.goodsKey }).then(res => {
        this.goodsList = res.data
        if (res.data.length === 0) {
          this.$message({
            message: '没有搜索到你想要的商品',
            type: 'warning'
          })
        }
      })
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
        height: 25px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .evaluate {
        color: #a7a7a7;
        font-size: 12px;
        padding: 8px 0;
        b {
          font-weight: bold;
          color: #646fb0;
        }
      }
      .shop {
        color: #a7a7a7;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        i {
          color: #409eff;
        }
      }
    }
    .grid-content:hover {
      border-color: #e9e9e9;
      box-shadow: 0 0 2px 2px #f8f8f8;
    }
  }
}
</style>
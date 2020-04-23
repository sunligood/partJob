<template>
  <div class="home">
    <common-title></common-title>
    <div class="c-main">
      <main-header></main-header>
      <div class="banner">
        <el-carousel trigger="click" height="400px">
          <el-carousel-item v-for="item in banner" :key="item">
            <img :src="item" width="800px" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="shop">
        <el-link type="primary" @click="$router.push('/store/all')">去购物</el-link>
        <i class="el-icon-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTitle from '../components/CommonTitle'
import MainHeader from '../components/MainHeader'
export default {
  name: 'Home',
  data() {
    return {
      banner: [
        require('../assets/banner/1.webp'),
        require('../assets/banner/2.webp'),
        require('../assets/banner/3.webp'),
        require('../assets/banner/4.webp')
      ],
      goodsKey: '' //商品关键词
    }
  },
  methods: {
    goShop(str) {
      if (!this.goodsKey) return
      this.$router.push(`/store/${this.goodsKey}`)
    }
  },
  components: {
    CommonTitle,
    MainHeader
  }
}
</script>
<style lang="scss" scoped>
.home {
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
}
</style>
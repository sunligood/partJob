<template>
  <div class="merchant-user">
    <i style="color:#409eff;font-size:150px" class="el-icon-s-shop"></i>
    <el-card class="box-card">
      <p>商铺： {{userInfo.storeName}}</p>
      <p>电话： {{userInfo.mobile}}</p>
      <p>邮箱： {{userInfo.email}}</p>
      <p>地址： {{userInfo.address}}</p>
      <p>营业额： {{sumPrice}}元</p>
      <p>总销量： {{sumSale}}件</p>
      <p>好评： {{goodCount}}条</p>
      <p>差评： {{badCount}}条</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MerchantUser',
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      goodCount: 0,
      badCount: 0,
      sumSale: 0,
      sumPrice: 0
    }
  },
  created() {
    this.$axios
      .post('/queryPrd', { storeName: this.userInfo.storeName })
      .then(res => {
        if (res.data.length) {
          res.data.forEach(item => {
            this.goodCount += item.favourable
            this.badCount += item.harmful
            this.sumSale += item.saleNum
            this.sumSale += item.saleNum
            this.sumPrice += item.saleNum * item.price
          })
        }
      })
  },
  methods: {},
  components: {}
}
</script>
<style lang="scss" scoped>
.merchant-user {
  width: 480px;
  font-size: 16px;
  margin: 0 auto;
  text-align: center;
  p {
    padding: 10px 0;
  }
  .box-card {
    width: 480px;
    text-align: left;
  }
}
</style>
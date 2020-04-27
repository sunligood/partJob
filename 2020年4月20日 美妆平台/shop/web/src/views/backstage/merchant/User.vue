<template>
  <div class="merchant-user">
    <el-avatar icon="el-icon-user-solid"></el-avatar>
    <p>商铺名称： {{userInfo.storeName}}</p>
    <p>电话： {{userInfo.mobile}}</p>
    <p>邮箱： {{userInfo.email}}</p>
    <p>地址： {{userInfo.address}}</p>
  </div>
</template>

<script>
export default {
  name: 'MerchantUser',
  data() {
    return {
      userInfo: this.$store.state.userInfo
    }
  },
  created() {},
  methods: {},
  components: {}
}
</script>
<style lang="scss" scoped>
.merchant-user {
  padding: 50px;
  font-size: 14px;
  p {
    padding: 10px 0;
  }
}
</style>
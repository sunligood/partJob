<template>
  <div class="merchant-user">
    <el-avatar icon="el-icon-user-solid"></el-avatar>
    <p>商铺名称： xxxx</p>
    <p>电话： xxxx</p>
    <p>邮箱： xxxx</p>
    <p>地址： xxxx</p>
  </div>
</template>

<script>
export default {
  name: 'MerchantUser',
  data() {
    return {
    }
  },
  created() {},
  methods: {
  },
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
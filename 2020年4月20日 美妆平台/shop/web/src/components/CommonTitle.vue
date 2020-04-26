<template>
  <div class="common-title">
    <div class="c-main">
      <a v-if="!isLogin" @click="login" href="javascript:;">{{title}}</a>
      <span v-else>
        <a href="javascript:;" @click="login">{{title}}</a>&nbsp;
        <a href="javascript:;" @click="login">{{title}}</a>&nbsp;
        <a href="javascript:;" @click="login">{{title}}</a>&nbsp;
        <a href="javascript:;" @click="login">{{title}}</a>&nbsp;
        <a href="javascript:;" @click="login">{{title}}</a>&nbsp;
        <a href="javascript:;" @click="login">{{title}}</a>&nbsp;
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '请先登录'
    }
  },
  data() {
    return {
      isLogin: false
    }
  },
  methods: {
    login() {
      this.$router.push('/login/1')
    }
  }
}
</script>

<style lang="scss">
.common-title {
  line-height: 30px;
  background-color: #e3e4e5;
  .c-main {
    margin: 0 auto;
    max-width: 800px;
    text-align: right;
    font-size: 12px;
    cursor: pointer;
    a {
      color: #999;
      text-decoration: none;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
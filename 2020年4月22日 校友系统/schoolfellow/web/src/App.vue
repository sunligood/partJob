<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {}
</script>
<style>
@import './assets/css/main.css';
@import './assets/css/theme-green/color-green.css'; /*浅绿色主题*/
#app {
  padding: 0;
  margin: 0;
  overflow: auto;
}
.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  color: #bfcbd9;
  cursor: not-allowed;
  background-image: none;
  background-color: #eef1f6;
  border-color: #d1dbe5;
}
</style>
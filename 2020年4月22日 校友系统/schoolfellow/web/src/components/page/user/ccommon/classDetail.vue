<template>
  <div class="classDetail">
    <span>{{ systems }}</span>
    <span>{{ major }}</span>
    <span>{{ className }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      systems: '',
      major: '',
      className: ''
    }
  },
  // mounted() {
  //   this.systems = sessionStorage.getItem('systems')
  //   this.major = sessionStorage.getItem('major')
  //   this.class = sessionStorage.getItem('class')
  // },
  created() {
    this.systems = sessionStorage.getItem('systems')
    this.major = sessionStorage.getItem('major')
    this.className = sessionStorage.getItem('class')
  }

}

</script>
<style scoped>
.classDetail {
  background-color: #fff;
  display: inline-block;
  padding: 10px 20px;
}
.classDetail span {
  display: inline-block;
  margin: 0 10px;
}
</style>
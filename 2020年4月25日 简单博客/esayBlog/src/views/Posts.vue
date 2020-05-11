<template>
  <div class="posts">
    <Nav :activeIndex="'1'"></Nav>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="width: 800px;margin: 38px auto;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="c-main" v-if="posts">
      <div>
        <p class="title">{{posts.title}}</p>
        <div class="sub">
          <p class="time">{{posts.date}}</p>
          <p class="read">
            <i class="el-icon-view"></i>
            {{posts.read}}
          </p>
        </div>
        <el-divider></el-divider>
        <p class="content" v-for="(item,index) in posts.content" :key="index">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Posts from '../assets/posts.json'
import Nav from '../components/nav'
export default {
  name: 'Posts',
  data() {
    return {
      posts: null
    }
  },
  mounted() {
    // 加载文章
    console.log(this.$route)
    let index = this.$route.params.index
    this.posts = Posts[index]
  },
  methods: {},
  components: {
    Nav
  }
}
</script>
<style lang="scss" scoped>
.posts {
  .c-main {
    width: 800px;
    margin: 0 auto;
    .title {
      text-align: center;
      font-size: 30px;
      font-weight: bold;
    }
    .sub {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
      font-size: 12px;
      color: #a09e9e;
    }
    .content {
      font-size: 15px;
      letter-spacing: 1px;
      text-indent: 30px;
    }
  }
}
</style>

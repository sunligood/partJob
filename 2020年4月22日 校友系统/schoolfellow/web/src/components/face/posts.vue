<template>
  <div class="posts">
    <v-head></v-head>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="width: 800px;margin: 38px auto;">
      <el-breadcrumb-item v-if="type === 'list'" :to="{ path: '/postsList' }">新闻动态</el-breadcrumb-item>
      <el-breadcrumb-item v-if="type === 'home'" :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新闻详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="c-main" v-if="posts">
      <div>
        <p class="title">{{posts.title}}</p>
        <div class="sub">
          <p class="time">{{posts.date}}</p>
        </div>
        <div style="height:1px;border-bottom:1px solid #f2f2f2;margin: 38px auto;"></div>
        <div style="text-align: center;">
          <img :src="posts.image" alt width="500px" />
        </div>
        <p class="contents" v-for="(item,index) in posts.content" :key="index">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Posts from '@/assets/posts.json'
import vHead from '@/components/face/common/header'
export default {
  name: 'Posts',
  data() {
    return {
      posts: null,
      type: ''
    }
  },
  mounted() {
    // 加载文章
    let index = this.$route.query.index
    this.type = this.$route.query.type
    this.posts = Posts[index]
  },
  methods: {},
  components: {
    vHead
  }
}
</script>
<style scoped>
.posts {
}
.c-main {
  width: 800px;
  margin: 0 auto;
}
.title {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
.sub {
  text-align: right;
  margin-top: 50px;
  font-size: 12px;
  color: #a09e9e;
}
.contents {
  padding: 10px;
  font-size: 15px;
  letter-spacing: 1px;
  text-indent: 30px;
}
</style>

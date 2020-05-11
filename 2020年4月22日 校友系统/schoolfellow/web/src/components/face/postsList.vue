<template>
  <div class="posts-list">
    <v-head></v-head>
    <div class="search">
      <el-input placeholder="输入你要查找的内容" v-model="searchVal" class="input-with-select">
        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-divider></el-divider>
    <div class="c-main">
      <div class="l">
        <ul class="posts">
          <li class="item" v-for="(item,index) in posts" :key="item.title" @click="goPosts(index)">
            <img :src="item.image" />
            <div class="text">
              <p class="title">{{item.title}}</p>
              <div class="detail">
                <p class="content">{{item.content[0]}}</p>
                <div class="bottom">
                  <p class="time">{{item.date}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Posts from '@/assets/posts.json'
import vHead from '@/components/face/common/header'
export default {
  data() {
    return {
      searchVal: '',
      posts: [],
      initPosts: []
    }
  },
  mounted() {
    // 加载文章
    this.posts = Posts
    this.initPosts = Posts
  },
  methods: {
    // 模糊搜索
    search() {
      let newposts = []
      let posts = this.initPosts
      posts.forEach(item => {
        if (JSON.stringify(item).indexOf(this.searchVal) !== -1) {
          newposts.push(item)
        }
      })
      this.posts = newposts
    },
    // 跳转文章详情
    goPosts(index) {
      this.$router.push({
        path: '/posts',
        query: { index: index, type: 'list' }
      })
    }
  },
  components: {
    vHead
  }
}
</script>
<style lang="scss" scoped>
.posts-list {
  .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    background: rgb(84, 92, 100);
  }
  .search {
    max-width: 800px;
    height: 150px;
    margin: 80px auto 0 auto;
  }

  .c-main {
    display: flex;
    justify-content: space-between;
    width: 800px;
    margin: 0 auto;
    .l {
      flex: 1;
      cursor: pointer;
      .item {
        display: flex;
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 20px;
        margin-bottom: 10px;
        img {
          width: 150px;
          height: 150px;
        }
        .text {
          flex: 1;
          height: 100px;
          margin-left: 40px;
          .title {
            font-size: 18px;
            &:hover {
              color: #409eff;
            }
          }
          .detail {
            font-size: 14px;
            .content {
              overflow: hidden;
              height: 40px;
              margin: 20px 0 40px 0;
            }
            .bottom {
              text-align: right;
              color: #909399;
            }
          }
        }
      }
    }
    .r {
      width: 155px;
      overflow: hidden;
      .posts {
        display: block;
        margin: 10px 0;
      }
    }
  }
}
</style>

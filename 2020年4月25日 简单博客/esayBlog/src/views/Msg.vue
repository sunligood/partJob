<template>
  <div class="msg">
    <Nav :activeIndex="'4'"></Nav>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="width: 800px;margin: 38px auto;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="c-main">
      <el-input type="textarea" :rows="7" v-model="desc" placeholder="来都来都，请留下点什么~"></el-input>
      <div style="margin-top:20px;text-align:right;">
        <el-button @click="sumitDesc" type="primary">畅言一下</el-button>
      </div>
      <div class="c-talk">
        <div class="head">
          <span>评论</span>
          <span v-if="message">{{message.length}}人参与，{{message.length}}条评论</span>
          <span v-else>0人参与，0条评论</span>
        </div>
        <el-divider></el-divider>
        <div class="talk-item" v-for="item in message" :key="item.user">
          <div class="user">
            <i class="el-icon-user-solid"></i>
            <p>{{item.user}}</p>
          </div>
          <div class="centent">{{item.content}}</div>
          <div class="r">
            <p>{{item.date}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Message from '../assets/message.json'
import Nav from '../components/nav'
export default {
  name: 'Msg',
  data() {
    return {
      posts: null,
      desc: '',
      message: []
    }
  },
  mounted() {
    let Message = window.localStorage.getItem('Message')
    this.message = JSON.parse(Message)
  },
  methods: {
    // 留言按钮
    sumitDesc() {
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      if (userInfo) {
        this.$confirm('确认留言？', '提示', {}).then(() => {
          let DESC = {
            content: this.desc,
            user: userInfo.name,
            date: this.dateFormat('YYYY-mm-dd HH:MM', new Date())
          }
          let Message = JSON.parse(window.localStorage.getItem('Message'))
          if (!Message) {
            //表示m没有值，初始化
            Message = [DESC]
          } else {
            Message.push(DESC)
          }
          // 缓存留言
          window.localStorage.setItem('Message', JSON.stringify(Message))
          // 页面数据更新
          this.desc = ''
          this.message = JSON.parse(window.localStorage.getItem('Message'))
        })
      } else {
        this.$confirm('您还没登录呢，请先登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$router.push({ name: 'Login', params: { url: '/msg' } })
        })
      }
    },
    // 日期格式
    dateFormat(fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          )
        }
      }
      return fmt
    }
  },
  components: {
    Nav
  }
}
</script>
<style lang="scss" scoped>
.msg {
  .c-main {
    width: 800px;
    margin: 0 auto;
    .c-talk {
      margin-top: 50px;
      .head {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #409eff;
      }
      .talk-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        .user {
          text-align: center;
          font-size: 20px;
          p {
            font-size: 12px;
          }
        }
        .centent {
          flex: 0.8;
          word-break: break-all;
        }
        .r {
          font-size: 12px;
          color: #a09e9e;
          p {
            padding: 20px 0;
          }
        }
      }
    }
  }
}
</style>

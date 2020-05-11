<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <el-dialog title="密码修改" :visible.sync="isShow" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input show-password v-model="form.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input show-password v-model="form.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input show-password v-model="form.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDailog">取 消</el-button>
        <el-button type="primary" @click="changePwd()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import bus from './bus'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      tagsList: [],
      collapse: false,
      form: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters('dailog', ['isShow'])
  },
  methods: {
    ...mapActions('dailog', ['hideDailog', 'showDailog']),
    handleClose() {
      this.hideDailog()
    },
    changePwd() {
      if (this.form.oldPassword != sessionStorage.getItem('password')) {
        this.$message.error('旧密码错误！')
        return false
      }
      if (this.form.newPassword == '') {
        this.$message.error('请输入新密码！')
        return false
      }

      if (this.form.checkPassword == '') {
        this.$message.error('请确认新密码！')
        return false
      }
      if (this.form.newPassword != this.form.checkPassword) {
        this.$message.error('请确认密码是否一致！')
        return false
      }
      if (this.form.newPassword == this.form.oldPassword) {
        this.$message.error('新密码不能与旧密码相同')
        return false
      }

      let parms = {
        userID: sessionStorage.getItem('userID'),
        password: this.form.newPassword
      }
      this.$axios.post('/updateStu', parms).then(res => {
        if (res.data.code == 1) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.hideDailog()

          setTimeout(() => {
            this.$router.push('/login')
          }, 1500)
        } else {
          this.$message.error('修改失败！')
        }
      })
    }
  },
  components: {
    vHead,
    vSidebar
  },
  created() {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  }
}
</script>

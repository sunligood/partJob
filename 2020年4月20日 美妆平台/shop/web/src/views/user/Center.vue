<template>
  <div class="user-center">
    <div class="c-main">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="dialogFormVisible = true"
          >编辑</el-button>
        </div>
        <div class="text item">
          <p>用户名： {{form.userName}}</p>
          <p>余额： {{form.money}}元</p>
          <p>手机号码： {{form.mobile}}</p>
          <p>收货地址： {{form.address}}</p>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top:20px">
        <div slot="header" class="clearfix">
          <span>分享的商品</span>
          <el-button style="float: right; padding: 3px 0" type="text"></el-button>
        </div>
        <div class="text item">
          <div
            v-for="item in shareData"
            :key="item.shareID"
            class="share"
            @click="goPrd(item.prdID)"
          >
            <img :src="item.imgUrl" alt width="150px" height="150px" />
            <div>
              <p>商品名：{{item.prdName}}</p>
              <p>价格：&yen;{{item.price}}</p>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog title="个人信息编辑" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="userName" :label-width="'100px'">
          <el-input v-model="editForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="money" :label-width="'100px'">
          <el-input v-model="editForm.money"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile" :label-width="'100px'">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address" :label-width="'100px'">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserCenter',
  data() {
    function checkPhone(rule, value, callback) {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('电话格式错误!'))
      } else {
        callback()
      }
    }
    function checkNumber(rule, value, callback) {
      if (!/^[0-9]*$/.test(value)) {
        callback(new Error('金额格式错误!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      userInfo: this.$store.state.userInfo,
      shareData: [],
      form: {},
      editForm: {},
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.form = this.userInfo
    this.editForm = JSON.parse(JSON.stringify(this.userInfo))
    this.queryShare()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.state.userInfo = this.editForm
          this.$axios.post('/updateUser', this.editForm).then(res => {
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this.form = JSON.parse(JSON.stringify(this.editForm))
            this.dialogFormVisible = false
            console.log(this.$store.state.userInfo)
          })
        }
      })
    },
    goPrd(id) {
      this.$router.push('/goods/' + id)
    },
    queryShare() {
      this.$axios
        .post('/share', { userID: this.userInfo.userID, type: 'query' })
        .then(res => {
          this.shareData = res.data
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-center {
  .c-main {
    margin: 0 auto;
    .box-card {
      .item {
        p {
          font-size: 14px;
          padding: 10px;
        }
      }
    }
    .share {
      display: flex;
      margin-bottom: 5px;
      cursor: pointer;
      div {
        margin-left: 10px;
      }
    }
  }
}
</style>
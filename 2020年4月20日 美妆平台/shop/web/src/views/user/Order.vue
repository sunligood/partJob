<template>
  <div class="user-order">
    <div class="c-main">
      <el-card class="box-card" style="margin-top:20px">
        <div slot="header" class="clearfix">
          <span>订单列表</span>
          <el-button style="float: right; padding: 3px 0" type="text"></el-button>
        </div>
        <div class="text item">
          <div v-for="item in orderData" :key="item.id" class="share">
            <img :src="item.imgUrl" alt width="150px" height="150px" />
            <div @click="goPrd(item.prdID)">
              <p>商品名：{{item.prdName}}</p>
              <p>价格：&yen;{{item.price}}</p>
              <p>数量：x{{item.saleNum}}</p>
              <p>订单状态： 支付完成</p>
            </div>
            <div class="order-btn">
              <el-button
                @click="discuss(item)"
                size="mini"
                :type="item.isBad ? '' : 'primary'"
              >{{item.isBad ? '评价完成': '立即评价'}}</el-button>
              <el-button v-if="item.isBad" @click="remove(item)" size="mini" type="danger">删除</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog title="商品" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="ruleForm">
        <el-form-item label="是否满意" :label-width="'100px'">
          <el-radio-group v-model="form.isBad">
            <el-radio :label="0">好评</el-radio>
            <el-radio :label="1">差评</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="评论一句" :label-width="'100px'">
          <el-input type="textarea" v-model="form.msg" placeholder="说说使用感受"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right">
          <el-button @click.stop="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDiscuss">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserOrder',
  data() {
    return {
      dialogFormVisible: false,
      userInfo: this.$store.state.userInfo,
      orderData: [],
      form: {
        msg: '',
        isBad: 0
      },
      selitem: null
    }
  },
  mounted() {
    this.queryOrder()
  },
  methods: {
    goPrd(id) {
      this.$router.push('/goods/' + id)
    },
    queryOrder() {
      this.$axios
        .post('/queryDeal', { userID: this.userInfo.userID })
        .then(res => {
          this.orderData = res.data
        })
    },
    discuss(item) {
      if (item.isBad) {
        return
      }
      this.dialogFormVisible = true
      this.selitem = item
    },
    confirmDiscuss() {
      // 新增评价
      let params = {
        msg: this.form.msg,
        isBad: this.form.isBad,
        date: this.$dateFormat('YYYY-mm-dd HH:MM', new Date()),
        prdID: this.selitem.prdID,
        userID: this.selitem.userID,
        userName: this.userInfo.userName,
        type: 'add',
        id: this.selitem.id
      }
      this.$axios.post('/discuss', params).then(res => {
        this.$message({
          type: 'success',
          message: '评价成功'
        })
        this.dialogFormVisible = false
        this.queryOrder()
      })
    },
    remove(item) {
      this.$confirm('是否删除该订单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(item)
          this.$axios.post('/deleteDeal', { id: item.id }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.queryOrder()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-order {
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
      position: relative;
      display: flex;
      margin-bottom: 5px;
      cursor: pointer;
      div {
        margin-left: 10px;
      }
      .order-btn {
        position: absolute;
        bottom: 0px;
        right: 0px;
      }
    }
  }
}
</style>
<template>
  <div class="merchant-detail">
    <el-card class="box-card" v-if="data">
      <div class="head">
        <img :src="data.imgUrl" width="200px" />
        <div class="r">
          <p>商品名：{{data.prdName}}</p>
          <p>已出售：{{data.saleNum}}/{{data.unit}}</p>
          <p>好评数：{{data.favourable}}条</p>
          <p>差评数：{{data.harmful}}条</p>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" v-if="discuss" style="margin-top:20px">
      <div class="discuss" v-for="item in discuss" :key="item.id">
        <div class="l">
          <p>{{item.userName}} &nbsp;({{item.isBad === '0' ? '好评' : '差评'}})&nbsp;{{item.date.substr(0,10)}}:</p>
          <p>{{item.msg}}</p>
          <p v-if="item.storeMsg" style="margin-top:10px">商家回复：{{item.storeMsg}}</p>
        </div>
        <el-button type="primary" size="mini" @click="showDia(item.id)" v-if="!item.storeMsg">回复</el-button>
      </div>
    </el-card>
    <el-dialog title="回复" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-input v-model="form.discuss" autocomplete="off"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="reply">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MerchantUser',
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      data: null,
      discuss: null,
      form: {
        discuss: ''
      },
      id: '',
      dialogFormVisible: false
    }
  },
  created() {
    let routeParams = this.$route.params
    if (routeParams !== '0') {
      this.$axios.post('/queryPrd', { prdID: routeParams.id }).then(res => {
        this.data = res.data[0]
      })
      this.$axios
        .post('/discuss', { type: 'query', prdID: routeParams.id })
        .then(res => {
          this.discuss = res.data
        })
    }
  },
  methods: {
    showDia(id) {
      console.log(id)
      this.id = id
      this.dialogFormVisible = true
    },
    reply() {
      this.$axios
        .post('/discuss', {
          type: 'update',
          id: this.id,
          storeMsg: this.form.discuss
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: '回复成功'
          })
          this.$axios
            .post('/discuss', { type: 'query', prdID: this.$route.params.id })
            .then(res => {
              this.discuss = res.data
            })
        })
      this.dialogFormVisible = false
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.merchant-detail {
  padding: 10px;
  .head {
    display: flex;
    align-items: end;
    .r {
      margin-left: 20px;
      p {
        padding: 10px 0;
      }
    }
  }
  .discuss {
    margin-bottom: 15px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    border-bottom: 1px solid #f0e9e9;
    .l {
      flex: 0.8;
    }
    p {
      padding-bottom: 5px;
    }
    p:first-child {
      color: #adabab;
    }
  }
}
</style>
<template>
  <div class="dopay">
    <common-title></common-title>
    <div class="c-main">
      <main-header title="结算页面"></main-header>
      <div class="address-suffix">
        <span>收货地址：</span>
        <span @click="adr">{{userInfo.address ? userInfo.address : '编辑地址~'}}</span>
      </div>
      <div style="font-size:14px;margin:20px 0">支付方式： 在线支付</div>
      <el-divider></el-divider>
      <div class="p-list">
        <div v-for="(item, index) in prdList" :key="index">
          <div class="p-item">
            <img :src="item.imgUrl" width="100px" height="100px" />
            <div class="r">
              <p class="name">商品名：{{item.prdName}}</p>
              <p class="price">价格：&yen;{{item.price}}</p>
              <p class="count">数量：x{{item.buyCount}}</p>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>

      <div class="bottom">
        <span>总价： {{sumPrice}}元</span>
        <el-button type="primary" @click="dopay">支付</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTitle from '../components/CommonTitle'
import MainHeader from '../components/MainHeader'
export default {
  name: 'Dopay',
  data() {
    return {
      address: '',
      prdList: [],
      userInfo: this.$store.state.userInfo
    }
  },
  computed: {
    sumPrice() {
      if (this.prdList) {
        let sum = 0
        this.prdList.forEach(item => {
          sum = sum + Number(item.price) * Number(item.buyCount)
        })
        return sum.toFixed(2)
      }
      return 0
    }
  },
  created() {
    if (this.$store.state.payList) {
      this.prdList = this.$store.state.payList
    }
    this.address = this.userInfo.address
  },
  methods: {
    // 支付
    dopay() {
      if (this.userInfo.userType !== 1) {
        this.$message({
          type: 'warning',
          message: '非用户不能进行购物'
        })
        return
      }
      if (this.userInfo.isAuthority === '0') {
        this.$message({
          type: 'warning',
          message: '亲~你没有购物权限'
        })
        return
      }
      if (this.address == '') {
        this.$message({
          type: 'warning',
          message: '请填写收货地址'
        })
        return
      }
      this.$prompt('请输入支付密码', '提示', {
        inputType: 'password',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          let prd = this.prdList
          this.prdList.forEach(prd => {
            let params = {
              storeName: prd.storeName,
              prdName: prd.prdName,
              price: this.sumPrice,
              saleNum: prd.buyCount,
              createdDate: this.$dateFormat('YYYY-mm-dd HH:MM', new Date()),
              imgUrl: prd.imgUrl,
              address: this.address,
              userID: this.userInfo.userID,
              prdID: prd.prdID,
              no: new Date().getTime()
            }
            this.$axios.post('/addDeal', params).then(res => {
              this.$message({
                type: 'success',
                message: '支付成功！'
              })
              this.$store.state.shopCar = []
              this.$router.push('/user/order')
            })
          })
        })
        .catch(err => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    adr() {
      if (this.address == '') {
        this.$router.push('/user/center')
      }
    }
  },
  components: {
    CommonTitle,
    MainHeader
  }
}
</script>
<style lang="scss" scoped>
.dopay {
  .c-main {
    margin: 0 auto;
    max-width: 800px;
    .p-list {
      .p-item {
        display: flex;
        img {
          margin-right: 20px;
        }
        .r {
          height: 100px;
          font-size: 14px;
          width: 300px;
          .name {
            margin-bottom: 13px;
            height: 43px;
            overflow: hidden;
          }
          .price {
            color: #333;
            height: 32px;
          }
          .count {
          }
        }
      }
    }
    .address-suffix {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
      }
      .el-input {
        width: 70%;
      }
    }
    .bottom {
      margin-top: 20px;
      text-align: right;
      span {
        margin-right: 50px;
        font-size: 14px;
      }
    }
  }
}
</style>
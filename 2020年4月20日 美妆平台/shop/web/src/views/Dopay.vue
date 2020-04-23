<template>
  <div class="dopay">
    <common-title></common-title>
    <div class="c-main">
      <main-header title="结算页面"></main-header>
      <div class="address-suffix">
        <span>收货地址：</span>
        <el-input v-model="address" placeholder="请输入地址"></el-input>
      </div>
      <div style="font-size:14px;margin:20px 0">支付方式： 在线支付</div>
      <el-divider></el-divider>
      <div class="p-list">
        <div v-for="items in 4" :key="items">
          <div class="p-item">
            <img src="../assets/goods1.png" width="100px" height="100px" />
            <div class="r">
              <p class="name">内存条，金士顿，十全 2666</p>
              <p class="price">&yen;200.00{{items}}</p>
              <p class="count">x1</p>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>

      <div class="bottom">
        <span>总价： 2000元</span>
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
      address: ''
    }
  },
  created() {
    let routeParams = this.$route.params
    if (routeParams.keys === 'all') {
      this.goodsKey = ''
    } else if (routeParams.keys) {
      this.goodsKey = routeParams.keys
    }
  },
  methods: {
    // 支付
    dopay() {
      this.$prompt('请输入支付密码', '提示', {
        inputType: 'password',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '支付成功！'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
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
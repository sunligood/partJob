<template>
  <div class="goods">
    <common-title></common-title>
    <div class="c-main" v-if="goods">
      <main-header title="商品详情"></main-header>
      <div class="grid-content bg-purple" v-if="goods !== null">
        <div class="img">
          <img :src="goods.imgUrl" width="260px" height="260px" />
        </div>
        <div class="detail">
          <p class="title">{{goods.prdName}}</p>
          <div class="price">
            <span>价&nbsp;格：</span>
            <sub>&yen;</sub>
            {{goods.price.toFixed(2)}}
          </div>
          <div class="text-item">
            <span>库&nbsp;存：</span>
            {{goods.counts}}
          </div>
          <div class="text-item">
            <span>评&nbsp;价：</span>
            {{goods.favourable + goods.harmful}}
          </div>
          <div class="text-item">
            <span>店&nbsp;铺：</span>
            {{goods.storeName}}
          </div>
          <div class="text-item">
            <span>数&nbsp;量：</span>
            <el-input-number
              v-model="buyCount"
              @change="handleChange"
              size="small"
              :min="1"
              :max="9999"
            ></el-input-number>
          </div>
          <div style="margin:20px 0">
            <el-button type="primary" @click="buy">立即购买</el-button>
            <el-button @click="addCar">加入购物车</el-button>
            <el-button @click="share">分享到主页</el-button>
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <el-tabs type="border-card">
          <el-tab-pane label="商品详情">
            <p>{{goods.detail}}</p>
          </el-tab-pane>
          <el-tab-pane label="商品评论">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部" name="all"></el-tab-pane>
              <el-tab-pane :label="`好评(${msgCount().count})`" name="good"></el-tab-pane>
              <el-tab-pane :label="`差评(${msgCount().countbad})`" name="bad"></el-tab-pane>
              <ul>
                <li class="user-items" v-for="item in prdMsg" :key="item.id">
                  <div class="l">
                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                    <p>{{item.userName}}</p>
                  </div>
                  <div class="r">
                    <p>{{item.msg}}</p>
                    <span>{{item.date.substr(0,10)}}</span>&nbsp;
                    <span>{{item.isBad === '0' ? '好评' : '差评'}}</span>
                    <p v-if="item.storeMsg">商家回复：{{item.storeMsg}}</p>
                  </div>
                </li>
              </ul>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTitle from '../../components/CommonTitle'
import MainHeader from '../../components/MainHeader'
export default {
  name: 'Goods',
  data() {
    return {
      activeName: 'all',
      buyCount: 1, // 购买数量
      goods: null,
      userInfo: this.$store.state.userInfo,
      prdMsg: [],
      prdMsgDefault: []
    }
  },
  created() {
    let routeParams = this.$route.params
    this.queryPrd(routeParams.id)
  },
  methods: {
    queryPrd(id) {
      this.$axios.post('/queryPrd', { prdID: id }).then(res => {
        this.goods = res.data[0]
      })
      this.$axios.post('/discuss', { type: 'query', prdID: id }).then(res => {
        this.prdMsg = res.data
        this.prdMsgDefault = res.data
      })
    },
    // 立即购买
    buy() {
      if (!this.userInfo) {
        this.$message({
          message: '请先登录',
          type: 'warning'
        })
        return
      }
      if (this.buyCount > this.goods.counts) {
        this.$message({
          message: '库存不足',
          type: 'warning'
        })
        this.buyCount = this.goods.counts
        return
      }

      this.goods.buyCount = this.buyCount
      this.$store.state.payList = [this.goods]
      this.$router.push({ name: 'Dopay' })
    },
    // 加入购物车
    addCar() {
      if (!this.userInfo) {
        this.$message({
          message: '请先登录',
          type: 'warning'
        })
        return
      }
      let shopCar = this.$store.state.shopCar
      let isBuy = true
      shopCar.some(item => {
        if (item.prdID === this.goods.prdID) {
          if (item.buyCount > this.goods.counts) {
            isBuy = false
            return false
          }
        }
      })
      if (!isBuy || this.goods.counts === 0) {
        this.$message({
          message: '库存不足',
          type: 'warning'
        })
        return
      }

      this.goods.buyCount = this.buyCount
      if (shopCar.length) {
        let isHas = false
        let eq = 0
        shopCar.forEach((item, index) => {
          if (item.prdID === this.goods.prdID) {
            isHas = true
            eq = index
          }
        })
        if (isHas) {
          this.$store.state.shopCar[eq].buyCount += this.goods.buyCount
          isHas = false
          eq = 0
        } else {
          this.$store.state.shopCar = shopCar.concat(this.goods)
        }
      } else {
        this.$store.state.shopCar = [this.goods]
      }
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },
    share() {
      if (!this.userInfo) {
        this.$message({
          message: '请先登录',
          type: 'warning'
        })
        return
      }
      let params = {
        imgUrl: this.goods.imgUrl,
        price: this.goods.price,
        prdName: this.goods.prdName,
        userID: this.userInfo.userID,
        imgUrl: this.goods.imgUrl,
        prdID: this.goods.prdID,
        type: 'add'
      }
      this.$axios.post('/share', params).then(res => {
        this.$message({
          message: '分享成功',
          type: 'success'
        })
      })
    },
    handleChange() {},
    handleClick() {
      if (this.activeName === 'all') {
        this.prdMsg = this.prdMsgDefault
      } else if (this.activeName === 'good') {
        let arr = []
        this.prdMsgDefault.forEach(item => {
          if (item.isBad === '0') {
            arr.push(item)
          }
          this.prdMsg = arr
        })
      } else if (this.activeName === 'bad') {
        let arr = []
        this.prdMsgDefault.forEach(item => {
          if (item.isBad === '1') {
            arr.push(item)
          }
          this.prdMsg = arr
        })
      }
    },
    msgCount() {
      let count = 0
      let countbad = 0
      if (this.prdMsgDefault.length) {
        this.prdMsgDefault.forEach(item => {
          if (item.isBad === '0') {
            count++
          } else {
            countbad++
          }
        })
        return { count, countbad }
      } else {
        return { count, countbad }
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
.goods {
  .c-main {
    margin: 0 auto;
    max-width: 800px;
    .grid-content {
      margin-top: 100px;
      display: flex;
      align-items: end;
      .img {
        padding: 30px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #eee;
        transition: border-color 0.2s ease;
      }
      .img:hover {
        border-color: #e9e9e9;
        box-shadow: 0 0 2px 2px #f8f8f8;
      }
      .detail {
        margin-left: 20px;
        .title {
          color: #666;
          font-size: 20px;
          letter-spacing: 1px;
        }
        .title-2 {
          padding-top: 10px;
          font-size: 16px;
          letter-spacing: 0px;
        }
        .price {
          padding: 10px 0;
          color: #e4393c;
          font-size: 20px;
          span {
            font-size: 12px;
            color: #a7a7a7;
          }
          sub {
            font-size: 12px;
          }
        }
        .text-item {
          padding: 10px 0;
          color: #a7a7a7;
          font-size: 12px;
        }
      }
    }
    .bottom-content {
      margin: 40px 0;
      .user-items {
        display: flex;
        justify-content: left;
        align-items: center;
        padding-bottom: 10px;
        font-size: 12px;
        .l {
          margin-right: 30px;
          text-align: center;
        }
        .r {
          p {
            padding: 5px 0;
          }
          span {
            font-size: 12px;
            color: #a7a7a7;
          }
        }
      }
    }
  }
}
</style>
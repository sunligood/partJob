<template>
  <div class="goods">
    <common-title></common-title>
    <div class="c-main">
      <main-header title="商品详情"></main-header>
      <div class="grid-content bg-purple">
        <div class="img">
          <img src="../../assets/goods1.png" width="260px" />
        </div>
        <div class="detail">
          <p class="title">这是商品描述这是商品描述这是商品描述这是商品描述</p>
          <div class="price">
            <span>价&nbsp;格：</span>
            <sub>&yen;</sub>2000.00
          </div>
          <div class="text-item">
            <span>库&nbsp;存：</span>10000
          </div>
          <div class="text-item">
            <span>评&nbsp;价：</span>2000.00
          </div>
          <div class="text-item">
            <span>店&nbsp;铺：</span>神秘商铺
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
            <el-button>分享到主页</el-button>
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <el-tabs type="border-card">
          <el-tab-pane label="商品详情">
            <p>硕仔湾 日本代购 champion 衣襟logo 短袖T恤 打底衫 3件套</p>
          </el-tab-pane>
          <el-tab-pane label="商品评论">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部" name="all"></el-tab-pane>
              <el-tab-pane label="好评" name="good"></el-tab-pane>
              <el-tab-pane label="差评" name="bad"></el-tab-pane>
              <ul>
                <li class="user-items">
                  <div class="l">
                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                    <p>sun</p>
                  </div>
                  <div class="r">
                    <p>這是一條評論</p>
                    <span>2020年4月23日21:05:37</span>
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
      goodsKey: '', //商品关键词
      goodsList: [] // 商品列表数据
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
    // 立即购买
    buy() {
      this.$router.push('/dopay')
    },
    // 加入购物车
    addCar() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },
    handleChange() {},
    handleClick() {}
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
      justify-content: flex-end;
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
      margin-top: 40px;
      .user-items {
        display: flex;
        justify-content: flex-end;
        align-items: center;
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
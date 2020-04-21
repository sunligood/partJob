<template>
  <div id="love_list">
    <c-title :hide="false" :text="love_name + '交易中心'"></c-title>
    <div style="height: 40px;"></div>
    <!-- 2020年4月18日 start -->
    <div class="collect-tab">
      <div class="tab-item">
        <p>{{allCount}}</p>
        <p>总成交量</p>
      </div>
      <div class="tab-item">
        <p>{{todayCount}}</p>
        <p>当前出售量</p>
      </div>
      <div class="tab-item">
        <p>{{guidePrice}}</p>
        <p>指导价格</p>
      </div>
    </div>
    <div class="fixed-sell" @click="goSell('love_trading_sell')">
      <span>出售</span>
    </div>
    <!-- 2020年4月18日 end -->
    <mt-navbar v-model="selected">
      <mt-tab-item id="0" @click.native="switchItem">全部交易</mt-tab-item>
      <mt-tab-item id="1" @click.native="switchItem">交易中</mt-tab-item>
      <mt-tab-item id="2" @click.native="switchItem">已完成</mt-tab-item>
      <mt-tab-item id="3" @click.native="switchItem">我的交易</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <div class="coupon_card">
        <mt-tab-container-item id="0">
          <!--全部-->
          <div class="tbs-item" v-for="(item,index) in wait_used" :key="index">
            <div class="l">
              <div class="left titles">{{love_name}}</div>
              <div class="left">单价:{{guidePrice}}&nbsp;&nbsp;数量:{{item.amount}}</div>
              <div class="left">{{item.created_at}}</div>
            </div>
            <div class="r">
              <div class="right reds">{{item.type_name}}-{{item.status_name}}</div>
              <div class="right" v-if="item.status==0 && item.own" @click="revoke(item.id)">点击撤回</div>
              <div class="right" v-if="item.status==0 && !item.own" @click="purchase(item.id)">点击购买</div>
            </div>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="1">
          <!--进行中-->
          <!-- <div class="tbs" v-for="(item,index) in underway" :key="index">
            <div class="left titles">{{love_name}}：{{item.amount}}</div>
            <div class="left titles">{{love_name}}：{{item.amount}}</div>
            <div class="right reds">{{item.type_name}}-{{item.status_name}}</div>
            <div class="left">{{item.created_at}}</div>
            <div class="right" v-if="item.status==0 && item.own" @click="revoke(item.id)">点击撤回</div>
            <div class="right" v-if="item.status==0 && !item.own" @click="purchase(item.id)">点击购买</div>
          </div>-->
          <div class="tbs-item" v-for="(item,index) in underway" :key="index">
            <div class="l">
              <div class="left titles">{{love_name}}</div>
              <div class="left">单价:{{guidePrice}}&nbsp;&nbsp;数量:{{item.amount}}</div>
              <div class="left">{{item.created_at}}</div>
            </div>
            <div class="r">
              <div class="right reds">{{item.type_name}}-{{item.status_name}}</div>
              <div class="right" v-if="item.status==0 && item.own" @click="revoke(item.id)">点击撤回</div>
              <div class="right" v-if="item.status==0 && !item.own" @click="purchase(item.id)">点击购买</div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <!--已完成-->
          <!-- <div class="tbs" v-for="(item,index) in done" :key="index">
            <div class="left titles">{{love_name}}：{{item.amount}}</div>
            <div class="right reds">{{item.type_name}}-{{item.status_name}}</div>
            <div class="left">{{item.created_at}}</div>
          </div>-->
          <div class="tbs-item" v-for="(item,index) in done" :key="index">
            <div class="l">
              <div class="left titles">{{love_name}}</div>
              <div class="left">单价:{{guidePrice}}&nbsp;&nbsp;数量:{{item.amount}}</div>
              <div class="left">{{item.created_at}}</div>
            </div>
            <div class="r">
              <div class="right reds">{{item.type_name}}-{{item.status_name}}</div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <!--自己的-->
          <div class="tbs" v-for="(item,index) in own" :key="index">
            <div class="left titles">{{love_name}}：{{item.amount}}</div>
            <div class="right reds">{{item.type_name}}-{{item.status_name}}</div>
            <div class="left">{{item.created_at}}</div>
            <div class="right" v-if="item.status==0 && item.own" @click="revoke(item.id)">点击撤回</div>
          </div>
        </mt-tab-container-item>
      </div>
    </mt-tab-container>
  </div>
</template>
<script>
import love_trading_controller from "./love_trading_controller";

export default love_trading_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/love_list.scss";
.tbs-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 5px; //add
  padding: 0.625rem 0.75rem;
  margin: 0.5rem 0.35rem; //add
  box-sizing: border-box;
  color: #8c8c8c;
  font-size: 14px;
  .left {
    line-height: 1.5rem;
    flex: 40%; //add
    text-align: left;
  }
  .right {
    line-height: 1.5rem;
    flex: 30%;
    text-align: right;
  }
  .titles {
    font-size: 14px;
    color: #333;
    line-height: 1.5rem;
  }
  .reds {
    color: #f15353;
    line-height: 1.5rem;
    font-size: 16px;
    small {
      font-size: 14px;
    }
  }
}
</style>

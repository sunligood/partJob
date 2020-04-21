<!-- 直播列表页 -->
<template>
  <div id="liveList">
    <c-title :hide="false" text="直播列表"></c-title>
    <div style="height: 40px"></div>
    <van-tabs v-model="active" swipeable sticky style="background: #FFFFFF" @change="getData">
      <van-tab title="我的关注" name='0'>
        <div class="attention-box">
          <div class="attention-item" v-for="(item,index) in recordsList" :key="index" @click="gotoAnchor(item.status,item.anchor_member_id,item.room_id)">
            <div class="left">
              <img :src="item.avatar" alt="">
            </div>
            <div class="middle">
              <p class="overflow">{{item.nickname}}</p>
              <p class="gray">粉丝:{{item.fan_count}}</p>
            </div>
            <div class="right" v-if="item.status">
              <i class="iconfont icon-zb_zhiboing"></i>
              <span>直播中</span>
            </div>
          </div>
        </div>
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem 0;" v-if="!isloading&&fun.isTextEmpty(recordsList)">
      </van-tab>
      <van-tab title="直播中" name='1'>
        <van-swipe
          :autoplay="4000"
          indicator-color="#f15353"
          :width="fun.getPhoneEnv() == 3 ? 375 : clientWidth"
         v-if="!fun.isTextEmpty(liveBanner)">
          <van-swipe-item
            v-for="(slide, index) in liveBanner"
            :key="index" v-if="slide.is_show"
          >
            <a :href="slide.url" style="display: block;">
              <img width="100%" style="height:11.25rem" :src="slide.image" />
            </a>
          </van-swipe-item>
        </van-swipe>
        <div class="living-box">
          <div class="living-item" v-for="(item, index) in recordsList" :key="index" @click="gotoAnchor(1,null,item.id)">
            <div class="bg">
              <img :src="item.cover" alt="">
            </div>
            <div class="title">
              <img :src="item.avatar" alt="">
              <span class="name">{{item.nickname}}</span>
            </div>
            <div class="top"><span class="red">直播中</span>{{item.view_num}}人观看</div>
            <div class="bottom overflow">{{item.title}}</div>
          </div>
        </div>
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem 0;" v-if="!isloading&&fun.isTextEmpty(recordsList)">
      </van-tab>
      <van-tab title="预告" name='2'>
        <div class="living-box">
          <div class="living-item" v-for="(item, index) in recordsList" :key="index" @click="gotoAnchor(2,null,item.id)">
            <img class="bg" :src="item.cover" alt="">
            <div class="title">
              <img :src="item.avatar" alt="">
              <span class="name">{{item.nickname}}</span>
            </div>
            <div class="purple">预告</div>
            <div class="bottom overflow">{{item.title}}</div>
          </div>
        </div>
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem 0;" v-if="!isloading&&fun.isTextEmpty(recordsList)">
      </van-tab>
      <van-tab title="精彩回放" name='3' v-if="isShowBack">
        <div class="living-box">
          <div class="living-item" v-for="(item, index) in recordsList" :key="index" @click="gotoAnchor(3,null,item.room_id,item.id)">
            <img class="bg" :src="item.cover" alt="">
            <div class="title">
              <img :src="item.avatar" alt="">
              <span class="name">{{item.nickname}}</span>
            </div>
            <div class="gray">回放</div>
            <div class="bottom overflow">{{item.title}}</div>
          </div>
        </div>
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem 0;" v-if="!isloading&&fun.isTextEmpty(recordsList)">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import liveList_Controller from "./liveList_Controller";

  export default liveList_Controller;
</script>
<style lang='scss' scoped>
  .attention-box {
    background: #FFFFFF;
    margin: 0.8rem;
    padding-bottom: 1rem;
  }
  .attention-item {
    display: flex;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    box-shadow: 0rem 0rem 0.469rem 0rem rgba(0, 0, 0, 0.09);
    border: 1px solid #eeeeee;
    border-radius: 5px;
    .left{
      flex: 0 0 3.75rem;
      width: 3.75rem;
      height: 3.75rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .middle {
      margin-left: 1rem;
      text-align: left;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        line-height: 2rem;
        width: 11rem;
      }
      .gray {
        color: #999999;
        font-size: 12px;
      }
    }
    .right {
      flex: 0 0 5.5rem;
      display: flex;
      align-self: center;
      justify-self: center;
      color: #e90505;
      line-height: 34px;
      i {
        font-size: 30px;
      }
    }
  }

  .living-box {
    background: #FFFFFF;
    margin: 0.8rem;
    padding-bottom: 1rem;
  }
  .living-item {
    position: relative;
    margin: 0 auto 0.5rem auto;
    .bg {
      width: 21.875rem;
      height: 10rem;
      border-radius: 0.313rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .title {
      display: flex;
      padding: 0.5rem 0;
      img {
        flex: 0 0 1.656rem;
        width: 1.656rem;
        height: 1.656rem;
        border-radius: 50%;
      }
      .name {
        display: inline-block;
        flex: 1;
        text-align: left;
        line-height: 1.656rem;
        margin-left: 0.5rem;
      }
    }
    .top {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 0.625rem 0rem 0.625rem 0rem;
      color: #FFFFFF;
      padding: 0.15rem 0.4rem 0.15rem 0;
      .red {
        background-color: #f10303;
        border-radius: 0.625rem 0rem 0.625rem 0rem;
        padding: 0.25rem 0.5rem;
        margin-right: 0.2rem;
      }
    }
    .bottom {
      width: 100%;
      height: 1.875rem;
      line-height: 1.875rem;
      position: absolute;
      bottom: 2.875rem;
      left: 0rem;
      font-weight: bold;
      font-size: 1rem;
      color: #FFFFFF;
      text-align: left;
      padding: 0 0.875rem;
      // background: rgba(0, 0, 0, 0.4);
    }
    .purple {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      color: #FFFFFF;
      font-size: 12px;
      background-color: #8415f5;
      border-radius: 0.625rem 0rem 0.625rem 0rem;
      padding: 0.2rem 0.6rem;
    }
    .gray {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      color: #FFFFFF;
      font-size: 12px;
      background-color: #999999;
      border-radius: 0.625rem 0rem 0.625rem 0rem;
      padding: 0.2rem 0.6rem;
    }
  }
</style>

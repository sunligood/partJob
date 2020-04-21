<template>
  <div id="all">
    <c-title :hide="false" text="商家"></c-title>
    <div style="width:100%;height:40px;"></div>
    <!-- new -->
    <div v-show="!isShow">
      <loading :show="true"></loading>
    </div>
    <div id="home_seller" v-show="isShow">
      <div class="banner">
        <img
          :src="
            mainInfo.store_barnner_thumb
              ? mainInfo.store_barnner_thumb
              : require('../../assets/images/loading.jpg')
          "
        />
      </div>
      <div class="header_box">
        <div class="img">
          <img
            :src="
              mainInfo.store_thumb
                ? mainInfo.store_thumb
                : require('../../assets/images/loading.jpg')
            "
          />
        </div>
        <ul class="name">
          <li>{{ mainInfo.store_name }}</li>
        </ul>
        <div
          class="btn"
          @click="goToCrash"
          v-if="mainInfo.is_open_cashier == 1"
        >
          <button type="button">优惠买单</button>
        </div>
      </div>
      <div class="top">
        <ul class="item">
          <li @click="goToAdress">
            <i class="iconfont icon-seller-position"></i>
            <span style="width:100%;">{{ mainInfo.store_address }}</span>
          </li>
          <li>
            <i class="iconfont icon-seller_phone"></i>
            <a :href="telephone" slot="left">{{ mainInfo.store_mobile }}</a>
          </li>
        </ul>
      </div>
      <ul class="into_store">
        <li @click="goToShop">
          <i class="iconfont icon-seller-car"></i>
          <span>进店选购</span>
          <i class="fa fa-angle-right"></i>
        </li>
      </ul>
      <ul class="store_time">
        <li>
          <i class="iconfont icon-seller-time"></i>
          <span>营业时间：{{ mainInfo.business_hours }}</span>
        </li>
      </ul>
      <div class="store_info">
        <div class="introduce">
          <ul class="text">
            <li>
              <i class="iconfont icon-seller-home"></i>
              <span>门店简介：</span>
              <p>{{ mainInfo.store_introduce }}</p>
            </li>
          </ul>
        </div>
        <div class="detail">
          <div class="detail_a">
            <i class="iconfont icon-seller-detail"></i>
            <span>商家详情：</span>
          </div>
          <!--<div class="img">-->
          <!--<img :src="mainInfo.store_thumb?mainInfo.store_thumb:require('../../assets/images/loading.jpg')">-->
          <!--</div>-->
          <p v-if="!infoShow" style="margin-left: 2rem;">暂无详情...</p>
          <p v-if="infoShow" v-html="info"></p>
        </div>
      </div>
    </div>

    <!--<div class="home-seller">-->
    <!--<div class="home-seller-banner">-->
    <!--<img :src="mainInfo.store_barnner_thumb?mainInfo.store_barnner_thumb:require('../../assets/images/loading.jpg')">-->

    <!--</div>-->

    <!--<yd-cell-group>-->
    <!--<div class="store-name">-->
    <!--<span class="left">门店名称:{{mainInfo.store_name}}</span>-->
    <!--<span class="right"><yd-button type="danger" @click.native=" goToCrash">优惠买单</yd-button></span>-->

    <!--</div>-->
    <!--<yd-cell-item arrow @click.native="goToDetail">-->
    <!--<span slot="left">商家详情</span>-->
    <!--<span slot="right"></span>-->
    <!--</yd-cell-item>-->
    <!--</yd-cell-group>-->

    <!--<div class="store-add">-->
    <!--<yd-cell-group>-->
    <!--<yd-cell-item arrow @click.native="goToAdress">-->
    <!--<yd-icon slot="icon" name="location" size="1.2rem" color="#ff9800"></yd-icon>-->
    <!--&lt;!&ndash; <span slot="left" style="width:80%;display:block;white-space:nowrap;overflow:hidden; text-overflow:ellipsis;">广东省-广州市-白云区-机场路1600号汇创意产业园C2栋201</span> &ndash;&gt;-->
    <!--<p slot="left">{{mainInfo.store_address}}</p>-->
    <!--</yd-cell-item>-->

    <!--<yd-cell-item>-->
    <!--<yd-icon slot="icon" name="phone2" size="1.2rem" color="#e85151" arrow></yd-icon>-->
    <!--&lt;!&ndash; <p slot="left">{{mainInfo.store_mobile}}</p> &ndash;&gt;-->
    <!--<a :href="telephone" slot="left">{{mainInfo.store_mobile}}</a>-->
    <!--</yd-cell-item>-->
    <!--</yd-cell-group>-->
    <!--</div>-->

    <!--<yd-cell-group>-->
    <!--<yd-cell-item arrow @click.native="goToShop">-->
    <!--<yd-icon slot="icon" name="home-outline" size="1.2rem"></yd-icon>-->
    <!--<span slot="left">进店选购</span>-->
    <!--</yd-cell-item>-->
    <!--</yd-cell-group>-->

    <!--<yd-cell-group>-->
    <!--<div class="store-time">-->
    <!--<span class="left">门店简介:</span><span class="right">{{mainInfo.store_introduce}}</span></div>-->
    <!--<yd-cell-item>-->
    <!--<span slot="left">营业时间:{{mainInfo.business_hours}}</span>-->
    <!--</yd-cell-item>-->
    <!--</yd-cell-group>-->

    <!--</div>-->
  </div>
</template>

<script>
import home from "./home_seller_controller";
export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.home-seller {
  .store-name {
    height: 3.125rem;
    border-bottom: solid 0.0625rem #e2e2e2;
    margin-left: 0.75rem;
    padding-right: 0.75rem;
    display: flex;
    .left {
      font-size: 15px;
      text-align: left;
      line-height: 3.125rem;
      flex: 3;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .right {
      text-align: right;
      line-height: 3.125rem;
      flex: 1;
    }
  }
  .store-add p {
    white-space: pre-wrap;
    text-align: left;
    margin: 0.5rem 0;
  }
  .store-time {
    text-align: left;
    font-size: 15px;
    padding: 0.875rem 0.75rem;
    border-bottom: solid 0.0625rem #e2e2e2;
    display: flex;
    .left {
      display: inline-block;
    }
    .right {
      flex: 3;
      display: inline-block;
    }
  }
  .home-seller-banner {
    height: 9.375rem;
    background: #ccc;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .home-seller-name {
    line-height: 2.5rem;
    height: 2.5rem;
    .home-seller-name-title {
      width: 5rem;
      float: left;
      font-size: 14px;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
    .home-seller-name-btn {
      float: right;
      height: 1.875rem;
      margin-top: 0.3125rem;
      border: 0.0625rem solid #ccc;
      outline: none;
      background: #e85151;
      color: #fff;
      border-radius: 0.25rem;
      width: 5rem;
      font-size: 14px;
      line-height: 1.875rem;
    }
  }

  .home-seller-detail {
    line-height: 2.5rem;
    height: 2.5rem;
    span {
      width: 5rem;
      float: left;
      font-size: 14px;
      text-align: left;
    }
    i {
      height: 2.5rem;
      font-size: 30px;
      color: #cccccc;
      float: right;
    }
  }

  .home-seller-address {
    line-height: 2.5rem;
    height: 2.5rem;
    font-size: 13px;
    span {
      height: 2.3125rem;
      float: left;
    }

    .address {
      padding: 0rem 0.1875rem 0rem 0.1875rem;
      width: 90%;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    i {
      height: 2.5rem;
      font-size: 30px;
      color: #cccccc;
    }
  }

  .home-seller-phone {
    line-height: 2.5rem;
    height: 2.5rem;
    font-size: 13px;
    span {
      float: left;
      clear: both;
    }
    .icon {
      height: 2.3125rem;
    }
    .number {
      float: right;
      padding: 0rem 0.1875rem 0rem 0.1875rem;
      display: block;
    }
  }

  .home-seller-buy {
    line-height: 2.5rem;
    height: 2.5rem;
    font-size: 13px;
    span {
      float: left;
      height: 2.3125rem;
    }

    i {
      float: right;
      height: 2.5rem;
      font-size: 30px;
      color: #cccccc;
    }
  }

  .line {
    height: 0.3125rem;
    background: #e5e5e5;
    clear: both;
  }

  .pad {
    padding-left: 3%;
    padding-right: 3%;
  }
}

.border-bottom {
  position: relative;
  border-top: none !important;
}

.border-bottom::after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.0625rem;
  background-color: #ccc;
  -webkit-transform-origin: left bottom;
  transform-origin: left bottom;
}
/* 2倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .border-bottom::after {
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}

/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  .border-bottom::after {
    -webkit-transform: scaleY(0.33);
    transform: scaleY(0.33);
  }
}
#home_seller {
  .banner {
    height: 8.75rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 8.75rem;
    }
  }
  .header_box {
    margin: auto;
    width: 21.25rem;
    display: flex;
    background-color: #fff;
    border-radius: 0.375rem;
    padding: 0.875rem;
    margin-top: -3.125rem;
    position: relative;
    box-shadow: 0 0.25rem 0.5625rem 0.0625rem rgba(0, 0, 0, 0.06);
    .img {
      width: 3rem;
      height: 3rem;
      border-radius: 0.125rem;
      overflow: hidden;
      margin-right: 0.625rem;
      img {
        width: 100%;
      }
    }
    .name {
      flex: 1;
      li {
        font-size: 16px;
        font-weight: bold;
        line-height: 1.5rem;
        text-align: left;
      }
    }
    .btn {
      flex: 0 0 6rem;
      button {
        border-radius: 1rem;
        border: solid 0.0625rem #22ac38;
        color: #22ac38;
        padding: 0.25rem 0.625rem;
      }
    }
  }
  .top {
    background-color: #fff;
    padding-top: 0.625rem;
    .item {
      // padding-left:0.875rem;
      // padding-top: 0.5rem;
      padding: 0.5rem 0 0.5rem 0.875rem;
      li {
        padding-right: 0.875rem;
        line-height: 1.8125rem;
        padding-top: 0.5rem;
        text-align: left;
        border-bottom: solid 0.0625rem #ebebeb;
        display: flex;
        i {
          font-size: 28px;
          color: #666;
          margin-right: 0.375rem;
        }
        a {
          font-size: 16px;
        }
      }
      li:last-child {
        border: none;
      }
    }
  }
  .into_store,
  .store_time {
    background: #fff;
    margin: 0.625rem 0;
    padding: 0 0.875rem;
    li {
      line-height: 2.8125rem;
      display: flex;
      position: relative;
      i:first-child {
        font-size: 28px;
        color: #666;
        margin-right: 0.375rem;
      }
      span {
        font-size: 16px;
      }
      i:last-child {
        position: absolute;
        right: 0rem;
        font-size: 1.5rem;
        line-height: 2.8125rem;
        color: #c9c9c9;
      }
    }
  }
  .store_info {
    background: #fff;
    padding: 0 0.875rem;
    text-align: left;
    .introduce {
      border-bottom: solid 0.0625rem #ebebeb;
      .text {
        padding: 0.625rem 0;
        li {
          display: flex;
          i {
            font-size: 28px;
            color: #666;
          }
          span {
            font-size: 16px;
            width: 5.375rem;
            margin-left: 0.375rem;
            line-height: 32px;
          }
          p {
            font-size: 14px;
            width: 14.375rem;
            line-height: 1.25rem;
            padding-top: 0.375rem;
          }
        }
      }
    }
    .detail {
      padding-top: 0.625rem;
      .detail_a {
        display: flex;
        i {
          font-size: 28px;
          color: #666;
        }
        span {
          font-size: 16px;
          margin-left: 0.375rem;
          line-height: 2rem;
        }
      }
      .img {
        height: 7.5rem;
        overflow: hidden;
        margin: 0.625rem 0;
        img {
          width: 100%;
          height: 7.5rem;
        }
      }
      p {
        font-size: 14px;
      }
    }
  }
}
</style>

<template>
  <div id="all"
       :class="[this.fun.getPhoneEnv() == 3?'pcStyle':''] ">
    <div class="content"
         v-show="!loadingPopup">
      <div class="search_top">
        <i class="fa fa-angle-left"
           @click="goback"></i>
        <input @click.stop="searchJump"
               type="text"
               readonly
               placeholder="搜索店内商品" />
        <i class="iconfont icon-sousuo"></i>
      </div>
      <div class="storeInfo_box"
           ref="storeInfo_box"
           :class="{ mout: amout }">
        <ul class="storeInfo">
          <li class="name">{{ store.store_name }}</li>
          <li class="time">
            <span>
              <i class="iconfont icon-service_j"></i>
              {{ store.business_hours }}
            </span>
            <span><i class="iconfont icon-service_o"></i>{{ store.dispatch }}
            </span>
          </li>
          <li class="coupon"
              @click.stop="gotoCupcon">
            <span>券</span>领取优惠券<i class="fa fa-angle-right"></i>
          </li>
        </ul>
        <div class="storeImg">
          <img :src="store.store_thumb" />
        </div>
      </div>
      <div class="menu_evaluate_business">
        <div class="nav">
          <ul class="select">
            <li v-for="(name, index) in tab"
                @click="changeTab(index)"
                :key='index'>
              <span :class="index === tabIndex ? 'current' : ''">
                {{ name }}
              </span>
            </li>
          </ul>
          <button type="button"
                  class="buy_btn"
                  @click.stop="goBuy"
                  v-if="store.is_open_cashier == 1">
            优惠买单
          </button>
        </div>

        <!-- 菜单 -->
        <div class="goods_box"
             v-show="tabIndex === 0">
          <div class="sort_box"
               ref="menuWrapper">
            <ul class="box">
              <li v-for="(items, index) in category"
                  :class="{ current: index === currentCategoryIndex }"
                  ref="list_li_menulist"
                  :key="items.id">
                <strong @click.stop="selectCategoryMenu(items, $event)">
                  <var style="-webkit-box-orient: vertical;">
                    {{ items.name }}
                  </var>
                </strong>
                <strong v-for="(item,i) in items.childrens"
                        class="second"
                        :key='i'
                        :class="{ current: item.id == currentIndex }"
                        v-if="currentCategoryIndex == index"
                        @click.stop="selectMenu(item.id, $event)">
                  <var style="-webkit-box-orient: vertical;">{{ item.name }}
                  </var>
                </strong>
              </li>
              <div style="height: 3.5rem;"></div>
            </ul>
          </div>
          <div class="goods_list"
               id="wrapper"
               ref="foodsWrapper">
            <div>
              <div class="food-list"
                   v-for="(good, index) in goods"
                   :key='index'>
                <div v-for="(item,i) in good"
                     :key='i'
                     class="food-list-hook">
                  <p class="title">{{ item.name }}({{ item.goods.length }})</p>
                  <div class="Goods"
                       v-for="(food,i) in item.goods"
                       :key='i'
                       @click.stop="goToGoodsO2O(food)">
                    <div class="goodsImg">
                      <img :src="food.thumb" />
                    </div>
                    <div class="goods_right">
                      <ul class="goodsName">
                        <li class="name">{{ food.title }}</li>
                        <li class="buy">
                          已售{{ food.show_sales+food.virtual_sales}}{{ food.sku }}

                        </li>
                        <li class="sum sum1"
                            v-if="food.vip_level_status&&food.vip_level_status.status==1">
                          ¥
                          <span> {{ food.vip_level_status.word }}</span>
                        </li>
                        <li class="sum"
                            v-else><span>¥</span>{{ food.price }}</li>
                      </ul>

                      <div class="specBtn"
                           v-if="food.has_option === 1 && (!food.vip_level_status || food.vip_level_status.status==0)">
                        <span class="goods-num"
                              :class="goodsCarts[food.id] ? 'show' : 'hide'"
                              v-if="goodsCarts[food.id]">{{ goodsCartsTotal[food.id].total }}
                        </span>
                        <button type="button"
                                @click.stop="addGood(food)">
                          选规格
                        </button>
                      </div>
                      <div class="addBtn"
                           v-if="
                          !store.operating_state &&
                            showDis &&
                            food.has_option !== 1 &&
                            (!food.vip_level_status || food.vip_level_status.status==0)
                        ">
                        <i class="iconfont icon-store_reduceLine"
                           @click.stop="numberLeft(food, goodsCarts[food.id])"
                           :class="goodsCarts[food.id] ? 'show' : 'hide'"></i>
                        <input title="数量"
                               :id="`goodsInputs${food.id}`"
                               :class="goodsCarts[food.id] ? 'show' : 'hide'"
                               v-if="goodsCarts[food.id]"
                               type="number"
                               class="goodsNumber"
                               @click.stop
                               v-model.lazy="goodsCarts[food.id].total"
                               @focus="clickCount(goodsCarts[food.id])"
                               @blur="changeCount(goodsCarts[food.id], food)" />
                        <i class="iconfont icon-store_plus"
                           @click.stop="numberRight(food, goodsCarts[food.id])"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="index === goods.length - 1"
                     style="height: 8.5rem;"></div>
              </div>
              <div v-if="category.length == 0">该门店没有商品</div>
            </div>
            <div class="loadNomore"
                 v-if="loading"
                 style="margin: 0 auto 2.5rem;text-align: center;width: 100%;height: 5.625rem;">
              <img style="width: 5rem;height: 3.75rem;"
                   src="../../../assets/images/no-more-product.png" />
            </div>
          </div>
        </div>
        <!-- 评价 -->
        <div class="evaluate_box"
             v-show="tabIndex === 1">
          <div class="evaluate_number">
            <ul class="evaluate_info">
              <li>
                <h6>{{ store.comment.average_score }}</h6>
                <span>综合评价</span>
              </li>
              <li>
                <h6>{{ store.comment.comment_total }}</h6>
                <span>评价数</span>
              </li>
            </ul>
          </div>
          <div class="evaluate_list">
            <div class="user_box"
                 v-for="(comment,i) in new_comment"
                 :key='i'>
              <div class="ueser_img">
                <img :src="comment.head_img_url" />
              </div>
              <div class="user_info">
                <ul class="info_a">
                  <li class="name_date">
                    <span class="name">{{ comment.nick_name }}</span>
                    <span class="date">{{ comment.created_at }}</span>
                  </li>
                  <li class="rate">
                    <van-rate readonly="true"
                              v-model="comment.level" />
                  </li>
                </ul>
                <p class="text">
                  {{ comment.content }}
                </p>
                <viewer :images="comment.images">
                  <div class="img_box">
                    <div class="img"
                         v-for="(img,i) in comment.images"
                         :key='i'>
                      <img :src="img" />
                    </div>
                  </div>
                </viewer>
              </div>
            </div>
          </div>
          <div style="height: 3.5rem;"></div>
        </div>
        <!-- 商家 -->
        <div class="store_box"
             v-show="tabIndex === 2">
          <div class="top">
            <ul class="item">
              <li @click="goToAdress">
                <i class="iconfont icon-seller-position"></i>
                <span style="width:100%;">{{ store.store_address }} </span>
              </li>
              <li>
                <i class="iconfont icon-seller_phone"></i>
                <a @click.stop="tel"
                   class="telPhone">
                  {{ store.store_mobile }}
                </a>
              </li>
            </ul>
          </div>
          <ul class="store_time">
            <li>
              <i class="iconfont icon-seller-time"></i>
              <span>营业时间：{{ store.business_hours }}</span>
            </li>
          </ul>
          <ul class="store_time" v-if="store.affiche">
            <li>
              <i class="iconfont icon-seller-detail"></i>
              <span>公告：{{ store.affiche }}</span>
            </li>
          </ul>
          <div class="store_info">
            <div class="introduce">
              <ul class="text">
                <li>
                  <i class="iconfont icon-seller-home"></i>
                  <span>门店简介：</span>
                  <p>{{ store.store_introduce }}</p>
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
              <p v-if="!info"
                 style="margin-left: 2rem;">暂无详情...</p>
              <p v-if="info"
                 v-html="info"></p>
            </div>
          </div>
          <div style="height: 3.5rem;"></div>
        </div>
      </div>

      <!-- 未添加商品 -->
      <div class="Go_settle"
           v-show="carts.length === 0 && !store.operating_state && showDis">
        <i class="iconfont"
           @click="trggleCart"></i>
        <p>购物车是空的</p>
        <button type="button"
                @click.stop="goodsOrder(goodsCarts)">
          请选择商品
        </button>
      </div>
      <!-- 已添加商品 -->
      <div class="Go_settle complete"
           v-show="carts.length > 0 && !store.operating_state && showDis">
        <span class="number"
              v-show="!this.showCart">{{cartsNum}}</span>
        <i :style="minicartStyle"
           class="iconfont"
           @click="trggleCart"></i>
        <p :style="leftPrice"><span>¥</span>{{ cartsTotal }}</p>
        <button @click.stop="goodsOrder(goodsCarts)"
                type="button">
          去结算
        </button>
      </div>
      <yd-popup v-model="showCart"
                position="bottom"
                width="100%"
                max-height="60%">
        <div class="top">
          <!--<van-checkbox v-model="checked"-->
          <!--&gt;全选<span class="select">(已选{{ cartsNum }}件) </span>-->
          <!--</van-checkbox>-->
          <div style="display: flex">
            <i class="cartIcon"
               @click="trggleCart"></i>
            <span class="select">(已选{{ cartsNum }}件) </span>
          </div>
          <div class="clear_car"
               @click.stop="clearCart">
            <i class="iconfont icon-delete"></i>
            <span>清空购物车</span>
          </div>
        </div>
        <div class="carPopup"
             ref="cartWrapper">
          <div>
            <div class="goodsList">
              <div class="goods"
                   v-for="(item, index) in carts"
                   :key='index'
                   @click.stop="goToGoodsO2O(item)">
                <!--<van-checkbox v-model="checked"></van-checkbox>-->
                <div class="goods_img">
                  <img :src="item.goods.thumb" />
                </div>
                <ul class="goodsName">
                  <li class="name">
                    {{ item.goods.title }}
                    <span v-if="item.option_str">({{ item.option_str }})</span>
                  </li>
                  <li class="price">¥{{ item.goods.price }}</li>
                </ul>
                <div class="addBtn">
                  <i class="iconfont icon-store_reduceLine"
                     @click.stop="numberLeft1(item, index)"></i>
                  <input type="number"
                         :id="`itemIputs${index}`"
                         v-model="carts[index].total"
                         @focus="clickCount(item)"
                         @blur="changeCount(item)"
                         @click.stop />
                  <i class="iconfont icon-store_plus"
                     @click.stop="numberRight1(item, index)"></i>
                </div>
              </div>
            </div>
            <div style="height: 3.5rem;"></div>
          </div>
        </div>
      </yd-popup>

      <yd-popup v-model="show1"
                position="center"
                width="80%">

        <div style="background-color:#fff;">
          <p class="tips">
            商家休息中，暂不接受新订单
          </p>
          <p style="text-align: center;line-height: 2.5rem;">
            <button class="btn-sure"
                    @click.stop="show1 = false">
              我知道了
            </button>
          </p>
        </div>
      </yd-popup>
      <!-- 过期 -->
      <yd-popup v-model="show8"
                close-on-masker="false"
                position="center"
                width="80%">
        <div style="background-color:#fff;">
          <p class="tips">
            该商家已过期，去看看其他的吧
          </p>
          <p style="text-align: center;line-height: 2.5rem;">
            <button class="btn-sure"
                    @click.stop="goTOHome">
              我知道了
            </button>
          </p>
        </div>
      </yd-popup>

      <!--选规格-->
      <div class="scroll-hide">
        <yd-popup v-model="show2"
                  position="center" >
          <h3 class="title">
            {{ popTitle }}
            <i @click.stop="close"
               class="iconfont icon-close11"></i>
          </h3>
          <div class="spec_box q5"
               :style="{width: fun.getPhoneEnv() == 3 ? '375px' : ''}">
            <div class="spec_a"
                 v-for="(spec,i) in goodsInfo.has_many_specs"
                 :key='i'>
              <h5>{{ spec.title }}：</h5>
              <ul class="option">
                <li @click.stop="selectSpecs(item, item.id)"
                    v-for="(item,i) in spec.specitem"
                    :key='i'
                    :class="specid.indexOf(item.id) >= 0 ? 'cur' : ''">
                  {{ item.title }}
                </li>
              </ul>
            </div>
          </div>
          <div class="add_car">
            <ul class="car_btn">
              <li class="left"><span>¥</span>{{ popPrice }}</li>
              <li class="right">
                <span v-show="!popNum&&popStock>=1" @click.stop="submitAction">加入购物车</span>
                <span v-show="popStock<=0" style="background:#999999;">库存不足</span>
              </li>
              <div class="Box"
                   v-show="popNum >= 1">
                <i class="iconfont icon-store_reduceLine"
                   @click.stop="updateCart(popCard.id, -1)"></i>
                <label class="show">{{ popNum }}</label>
                <i class="iconfont icon-store_plus"
                   @click.stop="updateCart(popCard.id, 1)"></i>
              </div>
            </ul>
          </div>
        </yd-popup>
      </div>


    </div>

    <div class="loadingPopup"
         v-show="loadingPopup">
      <p class="tips"
         style="padding: 1rem">
        商品加载中 请稍后...
      </p>
    </div>

    <div class="y5"
         @click.stop="showToolbar"
         style="bottom: 7.1875rem;">
      <div class="y6"
           v-show="toolbar">
        <router-link class="y8"
                     :to="fun.getUrl('home')">
          首页
        </router-link>
        <router-link class="yb"
                     :to="fun.getUrl('orderlist', { status: '0' })">
          订单
        </router-link>
        <router-link class="yc"
                     :to="fun.getUrl('member')">
          我的
        </router-link>
        <i class="yd"></i>
      </div>
    </div>
  </div>
</template>
<script>
import home from "./store_controller_v2";

export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.food-list-hook {
  margin-bottom: 1.5rem;
}

.loadingPopup {
  position: absolute;
  left: calc(50% - 5rem);
  top: calc(65% - 4rem);
  border-radius: 20px;
}

.y5 {
  position: fixed;
  z-index: 1000;
  right: 0;
  bottom: 3.75rem;
  width: 2.25rem;
  height: 2.25rem;
  background: rgba(0, 0, 0, 0.8)
    url(//static-o2o.360buyimg.com/daojia/new/images/menu/bm.png) 0.4375rem
    0.4375rem no-repeat;
  background-size: 4.0625rem 1.25rem;
  border: 0.0625rem solid #757575;
  border-radius: 0.25rem 0 0 0.25rem;
}

.y6 {
  position: absolute;
  right: -0.0625rem;
  bottom: 2.625rem;
  width: 5.9375rem;
  border: 0.0625rem solid #757575;
  background: rgba(0, 0, 0, 0.8);
}

.y6 a {
  display: block;
  padding-left: 2.375rem;
  border-bottom: 0.0625rem solid #4b4b4b;
  line-height: 2.1875rem;
  height: 2.1875rem;
  color: #fff;
  background-image: url(//static-o2o.360buyimg.com/daojia/new/images/icon/bmenu.png);
  background-repeat: no-repeat;
  background-size: 1rem 18.75rem;
}

.y8 {
  background-position: 0.625rem -3.125rem;
}

.yb {
  background-position: 0.625rem -12.5rem;
}

.yc {
  background-position: 0.625rem -15.625rem;
  border: none;
}

.yd {
  position: absolute;
  bottom: -0.75rem;
  right: 0.625rem;
  width: 0;
  height: 0;
  z-index: 15;
  border-width: 0.375rem;
  border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  border-style: solid;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-weight: normal;
  font-style: normal;
}

select,
option {
  word-wrap: normal;
}

select {
  font-size: 16px;
  font-family: "Microsoft YaHei", Verdana, Arial, Helvetica, sans-serif;
}
textarea {
  font-size: 15px;
}
img {
  border: 0;
  vertical-align: auto;
}
ul,
li {
  list-style: none;
}
button {
  font-family: "Microsoft YaHei", Verdana, Arial, Helvetica, sans-serif;
  outline-style: none;
}
.checkbox,
input[type="checkbox"] {
  vertical-align: middle;
  display: inline-block;
  width: 2.75rem;
  height: 2.75rem;
  -webkit-appearance: none;
  appearance: none;
}
.show {
  display: block;
}

.hide {
  display: none;
}

.tips {
  line-height: 3.5rem;
}

.btn-sure {
  padding: 0.3rem 0.6rem;
  background: #f15353;
  color: #fff;
}

.mout {
  margin-top: -8rem;
}

#all {
  .content {
    padding-top: 44px;
    background: #f5f5f5
      url(//static-o2o.360buyimg.com/daojia/new/images/store_industry_1.jpg) 0 0
      no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -ms-background-size: cover;
    background-size: cover;
    .back_search {
      position: fixed;
      top: 0;
      width: 100%;
      height: 2.75rem;
      line-height: 2.75rem;
      padding: 0 0.875rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 100;
      .fa {
        font-size: 1.75rem;
        color: #fff;
      }
      .iconfont {
        font-size: 1.375rem;
        color: #fff;
      }
    }
    .search_top {
      position: fixed;
      top: 0;
      width: 100%;
      height: 2.75rem;
      line-height: 2.75rem;
      padding: 0 0.875rem;
      display: flex;
      align-items: center;
      background: #fff;
      z-index: 100;
      .fa {
        font-size: 1.75rem;
        color: #8c8c8c;
      }
      input {
        background: #f2f2f2;
        font-size: 14px;
        height: 1.875rem;
        width: 18.75rem;
        border-radius: 1rem;
        padding-left: 2.25rem;
        margin-left: 1.25rem;
      }
      .iconfont {
        font-size: 1.25rem;
        color: #8c8c8c;
        position: absolute;
        left: 3.25rem;
      }
    }
    .storeInfo_box {
      background: #fff;
      width: 21.5625rem;
      height: 6.25rem;
      border-radius: 0.375rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      /*margin: 0 auto;*/
      padding: 0.625rem;
      position: relative;
      top: 1.75rem;
      left: 1rem;
      transition: all 0.4s ease-out 0s;
      .storeInfo .name {
        font-size: 18px;
        font-weight: bold;
        width: 16.3125rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
      .storeInfo .time {
        font-size: 12px;
        margin-top: 0.3125rem;
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          margin-right: 0.625rem;
          line-height: 1.375rem;
          display: flex;
          align-content: center;
          .icon-service_j {
            font-size: 1.125rem;
            color: #ff9800;
            margin-right: 0.25rem;
          }
          .icon-service_o {
            font-size: 1.125rem;
            color: #4ec09f;
            margin-right: 0.25rem;
          }
        }
      }
      .storeInfo .coupon {
        margin-top: 0.3125rem;
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 40%;
        span {
          width: 1.25rem;
          height: 1.25rem;
          line-height: 1.25rem;
          text-align: center;
          display: block;
          background: #ff9800;
          margin-right: 0.3125rem;
          color: #fff;
          font-size: 12px;
        }
        .fa {
          color: #c9c9c9;
          font-size: 1rem;
          margin-left: 0.625rem;
        }
      }
      .storeImg {
        width: 3.375rem;
        height: 3.375rem;
        border-radius: 0.25rem;
        overflow: hidden;
        background: #f2f2f2;
        position: absolute;
        right: 0.625rem;
        top: -1.375rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .menu_evaluate_business {
      background: #fff;
      padding-top: 1.75rem;
      .nav {
        height: 2.875rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.9375rem;
        border-bottom: solid 0.0625rem #ebebeb;
        .select {
          display: flex;
          li {
            margin-right: 1.875rem;
            font-size: 15px;
            color: #999;
            span {
              display: inline-block;
              line-height: 2.875rem;
            }
            .current {
              font-size: 16px;
              font-weight: bold;
              color: #333;
              position: relative;
            }
            .current::after {
              content: "";
              width: 100%;
              height: 0.1875rem;
              background: #f15353;
              position: absolute;
              bottom: 0;
              left: 0;
            }
          }
        }
        .buy_btn {
          font-size: 12px;
          border: solid 0.0625rem #f15353;
          border-radius: 1rem;
          height: 1.625rem;
          padding: 0 0.625rem;
          color: #f15353;
        }
        .car_btn {
          font-size: 12px;
          border: solid 0.0625rem #ff9800;
          border-radius: 1rem;
          height: 1.625rem;
          padding: 0 0.625rem;
          color: #ff9800;
        }
      }
    }
    .goods_box {
      background: #f2f2f2;
      display: flex;
      position: absolute;
      width: 100%;
      height: 83%;
      overflow: hidden;
      .sort_box {
        height: 100%;
        overflow: hidden;
        flex: 0 0 5rem;
        background: #f2f2f2;
        .second {
          background: #ffffff;
          position: relative;
        }
        .second::after {
          height: 100%;
          content: "";
          width: 0.0625rem;
          position: absolute;
          top: 0;
          right: 0;
          border-right: 1px solid #999999;
          transform: scaleX(0.5);
        }
        .box {
          li {
            text-align: center;
            color: #999;
            strong {
              min-height: 2.875rem;
              display: -webkit-box;
              -webkit-box-pack: center;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              display: flex;
              align-items: center;
              padding: 0 0.5rem;
              font-size: 12px;
              var {
                line-height: 1.25rem;
                font-size: 14px;
              }
            }
            .current {
              background: #fff;
              color: #333;
              position: relative;
            }
            .current::before {
              content: "";
              background: #f15353;
              width: 0.2rem;
              height: 100%;
              position: absolute;
              top: 0;
              left: -0.0625rem;
            }
          }
        }
      }
      .goods_list {
        flex: 1;
        height: 100%;
        overflow: hidden;
        background: #ffffff;
        .title {
          background: #f2f2f2;
          line-height: 1.875rem;
          font-size: 12px;
          padding: 0 0.625rem;
          text-align: left;
        }
        .Goods {
          display: flex;
          padding: 0.625rem;
          position: relative;
          .goodsImg {
            width: 5rem;
            height: 5rem;
            background: #f2f2f2;
            border-radius: 0.25rem;
            overflow: hidden;
            margin-right: 0.625rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .goods_right {
            .goodsName {
              text-align: left;
              width: 11.3125rem;
              .name {
                font-size: 16px;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .buy {
                font-size: 12px;
                color: #8c8c8c;
                margin-top: 0.175rem;
              }
              .sum {
                font-size: 18px;
                color: #f15353;
                margin-top: 0.125rem;
                span {
                  font-size: 14px;
                }
              }
              .sum1 {
                box-sizing: border-box;
                color: #fff;
                font-size: 0.5rem;
                height: 1.25rem;
                line-height: 1.25rem;
                overflow: hidden;
                span {
                  font-size: 0.5rem;
                  background: #f15353;
                  padding: 0.2rem 0.5rem;
                  border-top-left-radius: 0.5rem;
                  border-bottom-right-radius: 0.5rem;
                }
              }
            }
            .specBtn {
              position: absolute;
              bottom: 0.625rem;
              right: 0.625rem;
              .goods-num {
                position: absolute;
                z-index: 10;
                border-radius: 0.6rem;
                padding: 0 0.3125rem;
                top: -8px;
                right: -9px;
                background: #ff5d5c;
                color: #fff;
              }
              button {
                font-size: 12px;
                background: #f15353;
                color: #fff;
                border-radius: 1rem;
                width: 3.25rem;
                height: 1.5rem;
              }
            }
            .addBtn {
              position: absolute;
              bottom: 0.625rem;
              right: 0.625rem;
              display: flex;
              .iconfont {
                width: 1.75rem;
                height: 1.75rem;
                line-height: 1.75rem;
                font-size: 26px;
                color: #f15353;
              }
              .icon-store_reduceLine {
                color: #aaaaaa;
              }
              input {
                width: 2rem;
                text-align: center;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .evaluate_box {
      background: #f5f5f5;
      .evaluate_number {
        padding: 0.9375rem 0;
        background: #fff;
        .evaluate_info {
          display: flex;
          li {
            width: 50%;
            h6 {
              font-size: 28px;
            }
            span {
              font-size: 14px;
              color: #8c8c8c;
            }
          }
          li:first-child {
            border-right: solid 0.0625rem #ebebeb;
          }
        }
      }
      .evaluate_list {
        margin-top: 0.625rem;
        background: #fff;
        padding-left: 0.9375rem;
        .user_box {
          border-bottom: solid 0.0625rem #ebebeb;
          padding-right: 0.9375rem;
          display: flex;
          padding-top: 0.9375rem;
          .ueser_img {
            width: 2.25rem;
            height: 2.25rem;
            border-radius: 2rem;
            background: #f2f2f2;
            overflow: hidden;
            margin-right: 0.625rem;
            img {
              width: 100%;
            }
          }
          .user_info {
            width: 18.9375rem;
            .info_a {
              text-align: left;
              .name_date {
                display: flex;
                justify-content: space-between;
                .name {
                  font-size: 14px;
                }
                .date {
                  font-size: 12px;
                  color: #8c8c8c;
                }
              }
            }
            .text {
              font-size: 14px;
              line-height: 1.25rem;
              margin-top: 0.3125rem;
              text-align: left;
            }
            .img_box {
              display: flex;
              flex-wrap: wrap;
              margin-top: 0.3125rem;
              .img {
                width: 5.9375rem;
                height: 5.9375rem;
                overflow: hidden;
                background: #f2f2f2;
                margin-right: 0.4375rem;
                margin-bottom: 0.4375rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .img:nth-child(3n) {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
    .store_box {
      background: #f5f5f5;
      .top {
        background-color: #fff;
        min-height: 6.5rem;
        padding: 0;
        .item {
          width: 95%;
          padding: 0.5rem 0 0.5rem 0.875rem;
          li {
            padding-right: 0.875rem;
            line-height: 1.8125rem;
            padding-top: 0.5rem;
            text-align: left;
            border-bottom: solid 0.0625rem #ebebeb;
            display: flex;
            i {
              font-size: 1.75rem;
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
      .store_time {
        background: #fff;
        margin: 0.625rem 0;
        padding: 0 0.875rem;
        text-align: left;
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
        padding: 0 0.875rem 0.625rem 0.875rem;
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
                line-height: 2.5rem;
              }
              p {
                font-size: 14px;
                width: 14.375rem;
                line-height: 1.5rem;
                margin-top: 0.5rem;
              }
            }
          }
        }
        .detail {
          padding-top: 0.625rem;
          .detail_a {
            display: flex;
            i {
              font-size: 1.75rem;
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
    .Go_settle {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 3.125rem;
      background: #666;
      display: flex;
      justify-content: space-between;
      z-index: 2000;
      .iconfont {
        background: url(../../../assets/images/store_car1.png) no-repeat center;
        background-size: 4rem;
        width: 4rem;
        height: 4rem;
        line-height: 4rem;
        color: #aaaaaa;
        font-size: 4rem;
        position: absolute;
        left: 0.625rem;
        bottom: -0.1rem;
        transition: transform 0.4s ease-out 0s;
      }
      p {
        font-size: 16px;
        color: #aaaaaa;
        padding-left: 5rem;
        line-height: 3.125rem;
      }
      button {
        width: 6.875rem;
        background: rgba(255, 255, 255, 0.1);
        color: #aaaaaa;
        font-size: 16px;
      }
    }
    .complete {
      .number {
        position: absolute;
        top: -0.5rem;
        left: 3.3rem;
        z-index: 10;
        padding: 0 0.3125rem;
        height: 0.9375rem;
        line-height: 0.9375rem;
        border-radius: 0.4375rem;
        text-align: center;
        font-size: 10px;
        background: #fff;
        color: #f15353;
      }
      .iconfont {
        background: url(../../../assets/images/store_car2.png) no-repeat center;
        background-size: 4rem;
        width: 4rem;
        height: 4rem;
        line-height: 4rem;
        color: #aaaaaa;
        font-size: 4rem;
        //position: absolute;
        //left: 0.625rem;
        //bottom: -0.1rem;
        transition: transform 0.4s ease-out 0s;
      }
      p {
        color: #ffffff;
        transition: transform 0.4s ease-out 0s;
      }
      button {
        width: 6.875rem;
        background: #f15353;
        color: #fff;
        font-size: 16px;
      }
    }
    .top {
      display: flex;
      justify-content: space-between;
      padding: 0 0.875rem;
      align-items: center;
      height: 2.5rem;
      font-size: 16px;
      border-bottom: solid 0.0625rem #ebebeb;
      .cartIcon {
        display: block;
        background: url(../../../assets/images/store_car2.png) no-repeat center;
        background-size: 2.5rem;
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        color: #aaaaaa;
        font-size: 2.5rem;
      }
      .select {
        font-size: 16px;
        color: #8c8c8c;
        margin-left: 0.25rem;
        line-height: 2.5rem;
      }
      .clear_car {
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        .iconfont {
          font-size: 1.125rem;
          color: #666;
          margin-right: 0.25rem;
        }
      }
    }
    .carPopup {
      max-height: 22rem;
      overflow: hidden;
      .goodsList {
        padding: 0 0.875rem;
        .goods {
          border-bottom: solid 0.0625rem #ebebeb;
          display: flex;
          position: relative;
          padding: 0.625rem 0;
          align-items: center;
          .goods_img {
            width: 3.375rem;
            height: 3.375rem;
            border-radius: 0.125rem;
            overflow: hidden;
            background: #f2f2f2;
            margin-right: 0.625rem;
            margin-left: 0.625rem;
            img {
              width: 100%;
            }
          }
          .goodsName {
            width: 13.75rem;
            text-align: left;
            .name {
              font-size: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .price {
              color: #f15353;
              font-size: 16px;
              margin-top: 0.625rem;
            }
          }
          .addBtn {
            position: absolute;
            bottom: 0.625rem;
            right: 0;
            display: flex;
            .iconfont {
              width: 1.75rem;
              height: 1.75rem;
              line-height: 1.75rem;
              font-size: 1.625rem;
              color: #f15353;
            }
            .icon-store_reduceLine {
              color: #aaaaaa;
            }
            input {
              width: 2rem;
              text-align: center;
              font-size: 12px;
            }
          }
        }
      }
    }
    .title {
      border-radius: 0.625rem 0.625rem 0 0;
      width: 100%;
      background-color: #fff;
      line-height: 2.75rem;
      border-bottom: solid 0.0625rem #ebebeb;
      font-size: 16px;
      i {
        position: absolute;
        right: 0.875rem;
        line-height: 2.75rem;
        color: #999;
        font-size: 1.125rem;
      }
    }
    .spec_box {
      background: #fff;
      width: 20.625rem;
      height: 18rem;
      overflow-y: scroll;
      padding-bottom: 3.4375rem;
      .spec_a {
        margin-top: 0.625rem;
        h5 {
          display: block;
          line-height: 2.5rem;
          text-align: left;
          padding-left: 1.25rem;
        }
        .option {
          display: flex;
          padding: 0 1.25rem;
          flex-wrap: wrap;
          .cur {
            border: solid 0.0625rem #f15353;
            background: #faf0f0;
          }
          li {
            cursor: pointer;
            padding: 0 6px;
            min-height: 1.875rem;
            line-height: 1.875rem;
            margin-right: 0.625rem;
            margin-bottom: 0.625rem;
            background: #f5f5f5;
            border: solid 0.0625rem #ebebeb;
            border-radius: 0.1875rem;
          }
        }
      }
    }
    .add_car {
      width: 100%;
      height: 3.4375rem;
      line-height: 3.4375rem;
      background-color: #fff;
      border-top: solid 0.0625rem #ebebeb;
      border-radius: 0 0 0.625rem 0.625rem;
      .car_btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.875rem;
        .left {
          color: #f15353;
          font-size: 16px;
          text-align: left;
          flex: 0 0 13rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            font-size: 16px;
          }
        }
        .right span {
          display: block;
          width: 5.5625rem;
          height: 1.875rem;
          line-height: 1.875rem;
          border-radius: 1rem;
          background: #f15353;
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }

  .Box {
    position: absolute;
    bottom: 0.625rem;
    right: 0.625rem;
    display: flex;
    .iconfont {
      width: 1.75rem;
      height: 1.75rem;
      line-height: 1.75rem;
      font-size: 26px;
      color: #f15353;
    }
    .icon-store_reduceLine {
      color: #aaaaaa;
    }
    input {
      width: 2rem;
      text-align: center;
      font-size: 12px;
    }
  }

  .Box label {
    right: 2.1875rem;
    color: #333333;
    font-size: 12px;
    padding: 0;
    width: 1.5rem;
    height: 1.75rem;
    overflow: hidden;
    display: inline-block;
    text-align: center;
    line-height: 1.75rem;
    vertical-align: top;
    -webkit-background-origin: content-box;
    background-origin: content-box;
    background-color: transparent;
  }

  .Box .hide {
    display: none;
  }

  /*选规格end*/
}
.pcStyle {
  .goods_box,
  .Go_settle,
  .search_top {
    width: 375px !important;
  }
}
</style>

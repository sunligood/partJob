<template>
  <div id="myrelationship">
    <c-title :hide="false" text='我的客户'></c-title>
    <div style="height:40px;"></div>
    <!-- 我的客户 -->

    <div id="content">
      <modal v-if="showModal" :title="mdTitle" :tips="mdTips" :value="mdValue" @onClose="handleToggle"></modal>
      <div class="header_box" v-if="isShowClient">
        <!--<h1>我的推荐人</h1>-->
        <div class="header">
          <div class="img">
            <img :src="myReferral.avatar">
          </div>
          <ul class="name">
            <li>昵称:{{myReferral.nickname}}</li>
            <li>会员ID:{{myReferral.uid}}</li>
          </ul>
        </div>
      </div>
      <div class="number_order">
        <ul class="number_box">
          <li>
            <span>客户数量：{{myReferral.child_total}}人</span>
            <span>总客户数：{{myReferral.team_total}}人</span>
            <span>客户订单：{{myReferral.child_order_money}}元</span>
            <span>客户总订单：{{myReferral.team_order_money}}元</span>
            <span>客户总支付商品数量:{{myReferral.team_goods_total}}</span>
          </li>
          <!-- <li>
            <span>客户订单：{{myReferral.child_order_money}}元</span>
            <span>客户总订单：{{myReferral.team_order_money}}元</span>
          </li> -->
        </ul>
        <div class="note">注：所有数据为截至到昨天汇总数据！</div>
        <div class="note">订单数、订单总额统计已完成的订单数据</div>
      </div>
      <div class="info_list">
        <mt-navbar v-model="activeName">
          <mt-tab-item id="first" @click.native="handleClick" v-if="level1&&level1.is_show">{{labelValue1}}</mt-tab-item>
          <mt-tab-item id="second" @click.native="handleClick" v-if="level2&&level2.is_show">{{labelValue2}}</mt-tab-item>
          <mt-tab-item id="third" @click.native="handleClick" v-if="level3&&level3.is_show">{{labelValue3}}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="activeName">
        <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
          <mt-tab-container-item id="first" v-if="level1&&level1.is_show">
          <!--<el-tab-pane name="first" :label="labelValue1" v-if="level1&&level1.is_show">-->
            <div class="list_box">
              <div class="list" v-for="(item,index) in first_content" :key="index">
                <div class="list_top">
                  <div class="header_left">
                    <div class="img">
                      <img :src="item.avatar">
                    </div>
                    <ul class="name">
                      <li>{{item.nickname}}</li>
                      <li>{{item.createtime}}</li>
                    </ul>
                  </div>
                  <div class="header_right">
                    <div class="Wechat" @click='handleToggle(item)' v-if="item.wechat!==0&&WeChat">
                      <img src="../../../assets/images/relation_Wechat.png">
                    </div>
                    <div class="phone" v-if="item.mobile!==0&&phone">
                      <a :href="'tel:'+item.mobile"><img src="../../../assets/images/relation_phone.png"></a>
                    </div>
                  </div>
                </div>
                <div class="order_info">
                  <ul class="order_number">
                    <li>订单数：{{item.child_order_total}}个</li>
                    <li>客户数量：{{item.team_total}}个</li>
                    <!-- <li>总客户数：233个</li> -->
                  </ul>
                  <ul class="order_sum">
                    <li>订单总额：{{item.child_order_money}}元</li>
                    <li>客户订单：{{item.team_order_money}}元</li>
                    <!-- <li>客户总订单：2330元</li> -->
                  </ul>
                </div>
              </div>
              <yd-button-group style="width:100%;padding:0px;">
                <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow1" class="more-btn">加载更多</yd-button>
              </yd-button-group>
            </div>
          <!--</el-tab-pane>-->
          </mt-tab-container-item>
          <mt-tab-container-item id="second" v-if="level2&&level2.is_show">
          <!--<el-tab-pane name="second" :label="labelValue2" v-if="level2&&level2.is_show">-->
            <div class="list_box">
              <div class="list" v-for='(item,index) in second_content' :key='index'>
                <div class="list_top">
                  <div class="header_left">
                    <div class="img">
                      <img :src="item.avatar">
                    </div>
                    <ul class="name">
                      <li>{{item.nickname}}</li>
                      <li>{{item.createtime}}</li>
                    </ul>
                  </div>
                  <div class="header_right">
                    <div class="Wechat" @click='handleToggle(item)' v-if="item.wechat!==0&&WeChat">
                      <img src="../../../assets/images/relation_Wechat.png">
                    </div>
                    <div class="phone" v-if="item.mobile!==0&&phone">
                      <a :href="'tel:'+item.mobile"><img src="../../../assets/images/relation_phone.png"></a>
                    </div>
                  </div>
                </div>

                <div class="order_info">
                  <ul class="order_number">
                    <li>订单数：{{item.child_order_total}}个</li>
                    <li>客户数量：{{item.team_total}}个</li>
                    <!-- <li>总客户数：233个</li> -->
                  </ul>
                  <ul class="order_sum">
                    <li>订单总额：{{item.child_order_money}}元</li>
                    <li>客户订单：{{item.team_order_money}}元</li>
                    <!-- <li>客户总订单：2330元</li> -->
                  </ul>
                </div>
              </div>
              <yd-button-group style="width:100%;padding:0px;">
                <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow2" class="more-btn">加载更多</yd-button>
              </yd-button-group>
            </div>
          <!--</el-tab-pane>-->
          </mt-tab-container-item>
          <mt-tab-container-item id="third" v-if="level3&&level3.is_show">
          <!--<el-tab-pane name="third" :label="labelValue3" v-if="level3&&level3.is_show">-->
            <div class="list_box">
              <div class="list" v-for='(item,index) in third_content' :key='index'>
                <div class="list_top">
                  <div class="header_left">
                    <div class="img">
                      <img :src="item.avatar">
                    </div>
                    <ul class="name">
                      <li>{{item.nickname}}</li>
                      <li>{{item.createtime}}</li>
                    </ul>
                  </div>
                  <div class="header_right">
                    <div class="Wechat" @click='handleToggle(item)' v-if="item.wechat!==0&&WeChat">
                      <img src="../../../assets/images/relation_Wechat.png">
                    </div>
                    <div class="phone" v-if="item.phone!==0&&phone">
                      <a :href="'tel:'+item.mobile"><img src="../../../assets/images/relation_phone.png"></a>
                    </div>
                  </div>
                </div>
                <div class="order_info">
                  <ul class="order_number">
                    <li>订单数：{{item.child_order_total}}个</li>
                    <li>客户数量：{{item.team_total}}个</li>
                    <!-- <li>总客户数：233个</li> -->
                  </ul>
                  <ul class="order_sum">
                    <li>订单总额：{{item.child_order_money}}元</li>
                    <li>客户订单：{{item.team_order_money}}元</li>
                    <!-- <li>客户总订单：2330元</li> -->
                  </ul>
                </div>
              </div>
              <yd-button-group style="width:100%;padding:0px;">
                <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow3" class="more-btn">加载更多</yd-button>
              </yd-button-group>
            </div>
          <!--</el-tab-pane>-->
          </mt-tab-container-item>
        <!--</el-tabs>-->
        </mt-tab-container>
      </div>
    </div>
    <!-- 结束 -->

    <!-- <div class="relation-people">
      <h3 class="h3">我的推荐人</h3>
    </div> -->
    <!-- <div class="relation-people-info">
      <div class="relation-people-info-img">
        <img :src="myReferral.avatar">
      </div>
      <div class="relation-people-information"> -->
    <!-- <p>{{item.nickname}}</p>
				<p>会员id：{{uid}}</p> -->
    <!-- <p style="font-size:14px;margin-bottom:0.375rem;">昵称:{{myReferral.nickname}}</p>
        <p>会员ID:{{myReferral.uid}}</p>
      </div> -->
    <!-- </div> -->
    <!-- <div class="relation-people-row">
      <h3 style="color:#8c8c8c;">角色:{{myReferral.role}}</h3>
    </div> -->
    <!-- <div style="height:0.625rem;"></div> -->
    <!-- <div class="relation-people-amount">
      <span>我推荐的人({{total}})</span>
      <a href="javascript:;" @click="openPop()">筛选</a>
    </div> -->
    <!-- <div style="height:0.625rem;"></div> -->
    <!-- <div id="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="level1.level+'('+level1.total+'人)'" name="first" v-if="level1&&level1.is_show">
          <div v-for=" (item,index) in first_content">
            <div class="tbs" @click='toggle($event,index)'>
              <div class="li1"><img :src="item.avatar" /></div>
              <div class="li2">
                <p>昵称:{{item.nickname}}[id:{{item.id}}]</p>
                <p>金额:{{item.order_price}}</p>
              </div>
              <div class="li4">
                <i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
              </div>
            </div>
            <transition name="fade">
              <div class="tbs3" v-show='sort==index'>
                <div class="left">粉丝数量：{{item.agent_total}}</div>
                <div class="right">粉丝订单金额：{{item.agent_order_price}}元</div>
                <div class="left1">推广角色：{{item.role}}</div>
              </div>
            </transition>
          </div> -->

    <!-- <button @click="getData()" v-if="btnShow1">加载更多</button> -->
    <!-- <div class="more">
                <yd-button size="large" type="danger" @click.native="getData" v-if="btnShow1">加载更多</yd-button>
            </div> -->
    <!-- <yd-button-group style="width:100%;padding:0px;">
            <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow1" class="more-btn">加载更多</yd-button>
          </yd-button-group> -->

    <!-- v-if="level2&&level2.is_show" -->
    <!-- </el-tab-pane> -->
    <!-- <el-tab-pane :label="level2.level+'('+level2.total+'人)'" name="second" v-if="level2&&level2.is_show"> -->
    <!-- <div v-for=" (item,index) in second_content">
            <div class="tbs" @click='toggle($event,index)'>
              <div class="li1"><img :src="item.avatar" /></div>
              <div class="li2">
                <p>昵称:{{item.nickname}}[id:{{item.id}}]</p>
                <p>金额:{{item.order_price}}</p>

              </div>
              <div class="li4">
                <i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
              </div>
            </div>
            <transition name="fade">
              <div class="tbs3" v-show='sort==index'>
                <div class="left">粉丝数量：{{item.agent_total}}</div>
                <div class="right">粉丝订单金额：{{item.agent_order_price}}元</div>
                <div class="left1">推广角色：{{item.role}}</div>
              </div>
            </transition>

          </div> -->

    <!-- <button @click="getData" v-if="btnShow2">加载更多</button> -->
    <!-- <yd-button size="large" type="danger" @click.native="getData" v-if="btnShow2">加载更多</yd-button> -->
    <!-- <yd-button-group style="width:100%;padding:0px;">
            <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow2" class="more-btn">加载更多</yd-button>
          </yd-button-group> -->
    <!-- </el-tab-pane> -->
    <!-- <el-tab-pane :label="level3.level+'('+level3.total+'人)'" name="third" v-if="level3&&level3.is_show"> -->
    <!-- <div v-for="(item,index) in first_content">
            <div class="tbs" @click='toggle($event,index)'>
              <div class="li1"><img :src="item.avatar" /></div>
              <div class="li2">
                <p>昵称:{{item.nickname}}[id:{{item.id}}]</p>
                <p>金额:{{item.order_price}}</p>
              </div>
              <div class="li4">
                <i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
              </div>
            </div>
            <transition name="fade">
              <div class="tbs3" v-show='sort==index'>
                <div class="left">粉丝数量：{{item.agent_total}}</div>
                <div class="right">粉丝订单金额：{{item.agent_order_price}}元</div>
                <div class="left1">推广角色：{{item.role}}</div>
              </div>
            </transition>
          </div> -->

    <!-- <button @click="getData" v-if="btnShow3">加载更多</button> -->
    <!-- <yd-button-group style="width:100%;padding:0px;">
            <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow3" class="more-btn">加载更多</yd-button>
          </yd-button-group> -->
    <!-- <yd-button size="large" type="danger" @click.native="getData()" v-if="btnShow3">加载更多</yd-button> -->
    <!-- </el-tab-pane> -->
    <!-- </el-tabs> -->
    <!-- </div> -->

    <!-- <yd-popup v-model="show2" position="bottom" height="60%">
      <div class="relation-popup">
        <div class="relation-popup-con">
          <h3 style="color:#8c8c8c;">角色</h3>
          <ul>
            <li :class="{'active':filterSort==index,'':filterSort!=index}" v-for="(item,index) in filterData" @click="filterDataHandle(item,index)">{{item.role}}</li>
          </ul>
          <div style="clear:both"></div>
        </div> -->

    <!-- <div class="relation-popup-lever" v-if="filterLevelData.length>0">
          <h3>等级</h3>
          <ul>
            <li :class="{'active':filterLeveSort==index,'':filterLeveSort!=index}" v-for="(levelItem,index) in filterLevelData" @click="filterLevelDataHandle(levelItem,index)">{{levelItem.level_name}}</li>
          </ul>
          <div style="clear:both"></div>
        </div>
        <div class="button">
          <yd-button size="large" type="danger" @click.native="filterGetData">确定</yd-button>
        </div> -->

    <!-- </div> -->

    <!-- </yd-popup> -->

  </div>
</template>
<script>
import my_relationship_v2_controller from "./my_relationship_v2_controller";
export default my_relationship_v2_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#myrelationship {
  #content {
    .header_box {
      background: #fff;
      h1 {
        line-height: 2.5rem;
        font-size: 15px;
        padding: 0 0.875rem;
        text-align: left;
      }
      .header {
        background-color: #fafafa;
        padding: 1.25rem 0.875rem;
        display: flex;
        .img {
          width: 3rem;
          height: 3rem;
          border-radius: 1.75rem;
          border: solid 0.125rem #fff;
          overflow: hidden;
          margin-right: 0.625rem;
          img {
            width: 100%;
          }
        }
        .name {
          li {
            line-height: 1.5rem;
            text-align: left;
            font-size: 15px;
          }
          li:last-child {
            font-size: 14px;
            color: #8c8c8c;
          }
        }
      }
    }
    .number_order {
      background-color: #fff;
      color: #333;
      .number_box {
        padding: 0.625rem 0;
        display: flex;
        li {
          font-size: 16px;
          // width: 50%;
          span {
            display: block;
            line-height: 1.875rem;
            text-align: left;
            padding: 0 0.625rem;
          }
        }
      }
      .note {
        background: #fafafa;
        line-height: 2.25rem;
        text-align: left;
        padding: 0 0.875rem;
        font-size: 14px;
        color: #8c8c8c;
      }
    }
    .info_list {
      margin: 0.625rem 0;
      .list_box {
        .list {
          background-color: #fff;
          margin-bottom: 0.625rem;
          .list_top {
            padding: 0.75rem 0;
            display: flex;
            justify-content: space-between;
            border-bottom: solid 0.0625rem #ebebeb;
            .header_left {
              padding-left: 0.75rem;
              display: flex;
              .img {
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 1.25rem;
                overflow: hidden;
                margin-right: 0.625rem;
                img {
                  width: 100%;
                }
              }
              .name {
                text-align: left;
                width: 10rem;
                li:first-child {
                  font-size: 16px;
                  color: #333;
                  line-height: 1.5rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                li:last-child {
                  font-size: 14px;
                  color: #8c8c8c;
                  line-height: 1rem;
                }
              }
            }
            .header_right {
              padding-right: 0.625rem;
              display: flex;
              .Wechat,
              .phone,
              .news {
                width: 2.5rem;
                height: 2.5rem;
                img {
                  width: 1.75rem;
                  margin-top: 0.375rem;
                }
              }
            }
          }
          .order_info {
            padding: 0.625rem 0;
            display: flex;
            .order_number,
            .order_sum {
              width: 50%;
              text-align: left;
              li {
                line-height: 1.625rem;
                font-size: 14px;
                padding: 0 0.625rem;
              }
            }
          }
        }
      }
    }
  }
}
#myrelationship {
  width: 100%;
  height: 100%;
  .relation-people {
    h3 {
      color: #333;
      font-size: 14px;
      line-height: 2.25rem;
      padding: 0 0.875rem;
      text-align: left;
      font-weight: normal;
      background: #fff;
    }
  }

  .relation-people-info {
    padding: 0.625rem 0.875rem;
    float: left;
    width: 100%;
    .relation-people-info-img {
      width: 3.25rem;
      height: 3.25rem;
      border-radius: 50%;
      overflow: hidden;
      border: solid 0.125rem #fff;
      // margin-top:10px;
      // margin-left:10px;
      float: left;
      line-height: 3.125rem;
      background: #ccc;
      img {
        width: 100%;
      }
    }
    .relation-people-information {
      float: left;
      height: 3.125rem;
      padding-top: 0.25rem;
      text-align: left;
      margin-left: 0.625rem;
      p {
        margin-left: 0.625rem;
      }
    }
  }

  .relation-people-row {
    background: #fff;
    clear: both;
    h3 {
      color: #333;
      font-size: 12px;
      line-height: 2.25rem;
      padding: 0 0.875rem;
      text-align: left;
      font-weight: normal;
      background: #fff;
    }
  }

  .relation-people-amount {
    background: #fff;
    height: 2.75rem;
    line-height: 2.75rem;
    font-size: 14px;
    span {
      color: #333;
      padding-left: 0.625rem;
      text-align: left;
      font-weight: normal;
      float: left;
    }

    a {
      float: right;
      margin-right: 3%;
      color: #8c8c8c;
    }
  }

  a {
    float: right;
    margin-right: 3%;
  }
}

.tbs2 {
  background: #f5f5f5;
  align-items: center;
  border-bottom: #ebebeb 0.0625rem solid;
  padding: 0 0.625rem;
  .left {
    width: 46%;
    text-align: left;
    height: 2.8125rem;
    display: inline-block;
    line-height: 2.8125rem;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
  }
}
.tbs {
  align-items: center;
  background: #fff;
  border-bottom: #ebebeb 0.0625rem solid;
  padding: 0 0.75rem;
  float: left;
  width: 100%;
  background: #fff;
  .left {
    font-size: 12px;
    box-sizing: border-box;
    width: 50%;
    text-align: left;
    height: 2.8125rem;
    line-height: 2.8125rem;
    float: left;
    img {
      width: 30%;
      float: left;
    }
  }
  .right {
    width: 50%;
    text-align: right;
  }
  a {
    color: #000;
  }
  .relation {
    color: #666;
  }
  .id,
  .level {
    font-size: 14px;
    line-height: 2.8125rem;
  }
  .fa.fa-search {
    color: #999;
    font-size: 20px;
  }
  i {
    font-size: 24px;
    color: #929292;
  }
  .img {
    margin: 0.625rem 0;
  }
  .li1 {
    width: 3.125rem;
    height: 3.125rem;
    // margin-top:10px;
    // margin-left:10px;
    float: left;
    line-height: 3.125rem;
    background: #ccc;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .li2 {
    float: left;
    height: 3.125rem;
    p {
      margin-top: 0.4375rem;
      margin-left: 0.625rem;
      text-align: left;
    }
  }
  .li3 {
    flex: 30%;
    width: 30%;
    span {
      border: #b1a6a6 solid 0.0625rem;
      padding: 0.3125rem 1.25rem;
      border-radius: 0.4375rem;
      display: none;
    }
  }
  .li4 {
    // flex: 5%;
    // width: 5%;
    float: right;
    height: 3.125rem;
    line-height: 3.125rem;
  }
}
.imgst {
  background: #f5f5f5;
}
.fade-enter-active {
  transition: 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  height: 0px;
}

.tbs3 {
  .left {
    width: 46%;
    text-align: left;
    height: 2.8125rem;
    display: inline-block;
    line-height: 2.8125rem;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
    height: 2.8125rem;
    line-height: 2.8125rem;
  }
}

//弹窗
.relation-popup {
  overflow: auto;
  width: 100%;
}
.relation-popup-con {
  border-bottom: solid 0.0625rem #ebebeb;
  padding-bottom: 0.625rem;
  h3 {
    color: red;
    font-size: 12px;
    margin: 0;
    line-height: 2.75rem;
    padding: 0 1.25rem;
    text-align: left;
    font-weight: normal;
    background: #fff;
  }

  ul {
    padding: 0 5% 0 5%;
    li {
      width: 30%;
      background: #e8e6e9;
      float: left;
      height: 1.875rem;
      margin-right: 5%;
      margin-bottom: 0.625rem;
      border-radius: 0.3125rem;
      line-height: 1.875rem;
    }

    li:nth-of-type(3n) {
      margin-right: 0;
    }

    .active {
      border: 0.0625rem solid red;
      background: #fff;
    }
  }
}

.relation-popup-lever {
  clear: both;
  h3 {
    color: red;
    font-size: 12px;
    margin: 0;
    line-height: 2.75rem;
    padding: 0 1.25rem;
    text-align: left;
    font-weight: normal;
    background: #fff;
  }

  ul {
    padding: 0 5% 0 5%;
    li {
      width: 30%;
      background: #e8e6e9;
      float: left;
      height: 1.875rem;
      margin-right: 5%;
      margin-bottom: 0.625rem;
      border-radius: 0.3125rem;
      line-height: 1.875rem;
    }

    li:nth-of-type(3n) {
      margin-right: 0;
    }

    .active {
      border: 0.0625rem solid red;
      background: #fff;
    }
    // }

    // li:nth-child(1){
    // 	margin-right:5%;
    // }
  }
}
.button {
  button {
    width: 90%;
    margin: 1.25rem auto;
    height: 2.875rem;
    background-color: #f15353;
  }
}
.tbs2 {
  background: #f5f5f5;
  align-items: center;
  border-bottom: #ebebeb 0.0625rem solid;
  padding: 0 0.625rem;
  .left {
    width: 46%;
    text-align: left;
    height: 2.8125rem;
    display: inline-block;
    line-height: 2.8125rem;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
  }
}
.tbs {
  align-items: center;
  background: #fff;

  border-bottom: #ebebeb 0.0625rem solid;
  padding: 0.625rem 0.75rem;
  float: left;
  width: 100%;
  background: #fff;
  .left {
    font-size: 12px;
    box-sizing: border-box;
    width: 50%;
    text-align: left;
    height: 2.8125rem;
    line-height: 2.8125rem;
    float: left;
    img {
      width: 30%;
      float: left;
    }
  }
  .right {
    width: 50%;
    text-align: right;
  }
  a {
    color: #000;
  }
  .relation {
    color: #666;
  }
  .id,
  .level {
    font-size: 14px;
    line-height: 2.8125rem;
  }
  .fa.fa-search {
    color: #999;
    font-size: 20px;
  }
  i {
    font-size: 24px;
  }
  .img {
    margin: 0.625rem 0;
  }
  .li1 {
    width: 3.125rem;
    height: 3.125rem;
    // margin-top:10px;
    // margin-left:10px;
    float: left;
    line-height: 3.125rem;
    background: #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .li2 {
    float: left;
    height: 3.125rem;
    p {
      margin-top: 0.4375rem;
      margin-left: 0.625rem;
      text-align: left;
    }
  }
  .li3 {
    flex: 30%;
    width: 30%;
    span {
      border: #b1a6a6 solid 0.0625rem;
      padding: 0.3125rem 1.25rem;
      border-radius: 0.4375rem;
      display: none;
    }
  }
  .li4 {
    // flex: 5%;
    // width: 5%;
    float: right;
    height: 3.125rem;
    line-height: 3.125rem;
  }
}
.tbs2 {
  padding: 0.625rem 1.25rem;
}
.imgst {
  background: #f5f5f5;
}
.fade-enter-active {
  transition: 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  height: 0px;
}

.tbs3 {
  .left {
    width: 46%;
    text-align: left;
    height: 2.8125rem;
    display: inline-block;
    line-height: 2.8125rem;
    img {
      width: 30%;
    }
  }
  .left1 {
    width: 100%;
    text-align: left;
    height: 2.8125rem;
    padding-left: 0.8125rem;
    display: inline-block;
    line-height: 2.8125rem;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
    height: 2.8125rem;
    line-height: 2.8125rem;
  }
}
</style>

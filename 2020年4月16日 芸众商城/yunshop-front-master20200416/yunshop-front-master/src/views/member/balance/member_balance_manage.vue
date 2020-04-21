<template>
  <section id="balance_manage">
    <c-title :hide="false" text="保单管理"></c-title>
    <section id="release-goods">
      <div class="left">
        <div class="release-a" style="display:flex;">
          <!-- <yd-icon class="iconfont icon-block" custom color="#f15353" size="1.5rem"></yd-icon> -->
          <img
                  src="https://www.yunzmall.com/min_img/supplier-protect.png"
                  alt=""
                  style="width:30px;"
          />
        </div>
        <span>保单数量：{{ goods_length }}</span>
      </div>
     <div class="right">
       <van-button type="danger" size="small" round @click="goToAddbalance">添加保单</van-button>
     </div>
    </section>
    <section id="goods-list">
      <div class="goods-list" v-for=" (item,index) in data" :key="item">
        <div class="goods-list-top">
          <span>序号：{{ item.serial_number }}</span>
          <div class="contentright">
            <div class="title">{{ item.shop_name }}</div>
            <div class="btn">
                <span @click="moreEvent(index)">
                  <yd-icon class="iconfont icon-more" custom color="#c9c9c9" size="1.5rem"></yd-icon>
                </span>
              <div class="more" v-show="item.edit_active">
                <ul>
                  <li @click="editJumpEvent(index)">
                    <yd-icon class="iconfont icon-edit" custom color="#fff" size="1.125rem"></yd-icon>
                    <span>编辑</span>
                  </li>
                  <li @click="commodityDelete(index)">
                    <yd-icon class="iconfont icon-delete" custom color="#fff" size="1.125rem"></yd-icon>
                    <span>删除</span>
                  </li>
                </ul>
                <div class="icon">
                  <yd-icon class="iconfont icon-down" custom size="1.5rem"></yd-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-list-bottom" @click="goTodetail(item.id)">
          <span>查看记录</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import member_balance_manage from "./member_balance_managecontroller";

export default member_balance_manage;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#balance_manage {
  padding-top: 40px;
  #search-box {
    background-color: #fff;
    display: flex;
    height: 2.8125rem;
    line-height: 2.8125rem;
    position: relative;
    padding-left: 1.25rem;
    border-bottom: solid 0.0625rem #ebebeb;
    .search-a {
      background-color: #f2f2f2;
      height: 1.75rem;
      line-height: 1.75rem;
      border-radius: 0.875rem;
      display: flex;
      padding: 0 0.875rem;
      margin-top: 0.5313rem;
      width: 18.75rem;
      input {
        border: none;
        width: 90%;
        margin-left: 0.625rem;
      }
    }
    .search-b {
      width: 2.8125rem;
      height: 2.8125rem;
      position: absolute;
      right: 0;
    }
  }
  #release-goods {
    background-color: #fff;
    display: flex;
    font-size: 16px;
    position: relative;
    height: 3rem;
    line-height: 3rem;
    border-bottom: solid 0.0625rem #ebebeb;
    justify-content: space-between;
    .left{
      position: relative;
      display: flex;
      align-items: center;
      .release-a {
        width: 3rem;
        height: 3rem;
      }
      .release-b {
        position: absolute;
        right: 0.875rem;
        top: 0.6875rem;
        font-size: 14px;
        background-color: #f15353;
        height: 1.625rem;
        line-height: 1.625rem;
        padding: 0 0.625rem;
        display: block;
        border-radius: 0.8125rem;
        color: #fff;
      }
    }
    .right{
      display: flex;
      align-items: center;
      margin-right: 0.4rem;
      button{
        padding-left:1rem;
        padding-right: 1rem;
      }
    }
  }
  #goods-list {
    .goods-list {
      background-color: #fff;
      padding: 0.625rem 0;
      display: flex;
      flex-direction: column;
      border-bottom: solid 0.0625rem #ebebeb;
      .goods-list-top {
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 14px;
        padding: 0 0.875rem;
        display: flex;
        justify-content: space-between;
        border-bottom: solid 0.0625rem #ebebeb;
        .contentright{
          display: flex;
          align-items: center;
          .btn{
            position: relative;
            margin-left: 0.4rem;
            .more {
              line-height: normal;
              background: rgba(51, 51, 51, 0.9);
              border-radius: 0.25rem;
              color: #f0f0f0;
              width: 5.5rem;
              position: absolute;
              right: 0;
              top: -2rem;
              ul {
                display: flex;
                justify-content: center;
                li {
                  flex: 1;
                  text-align: center;
                  i {
                    display: block;
                    margin-top: 0.125rem;
                  }
                }
              }
              .icon {
                position: absolute;
                right: 0;
                top: 2rem;
                i {
                  color: rgba(51, 51, 51, 0.9);
                }
              }
            }
          }
        }
      }
      .goods-list-bottom {
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 14px;
        padding: 0 0.875rem;
        display: flex;
        justify-content: space-between;
        border-bottom: solid 0.0625rem #ebebeb;
        i {
          font-size: 1.25rem;
          color: #c9c9c9;
          line-height: 2.5rem;
        }
      }
    }
  }
}
</style>

<template>
  <div id="open_member">
    <c-title :hide="false" text='开通会员'></c-title>
    <div id="content">
         <div class="vip_box" v-for="(item,i) in listArr" :key='i'>
            <div class="img">
                <img :src="item.has_one_universal_level.thumb_image">
            </div>
            <ul class="text">
                <li class="text_a">{{item.level_name}}</li>
                <li class="text_b">有效期：{{item.validity}}天</li>
                <li class="text_c">{{item.discount}}折优惠&nbsp;&nbsp;&nbsp;更多特权</li>
            </ul>
            <div class="btn">
                <button type="button" @click="openSubmit(item)">立即开通</button>
            </div>
        </div>
        <!-- <div class="type_a" v-for="item in listArr" :style="{backgroundImage:'url('+item.has_one_universal_level.thumb_image+')'}">
            <ul class="top">
                <li class="name"><i class="iconfont icon-card_cap"></i><span>{{item.level_name}}</span></li>
                <li><button type="button" @click="openSubmit(item)">立即开通</button></li>
            </ul>
            <ul class="info">
                <li class="info_a"><span>{{item.has_one_goods.price}}</span>元</li>
                <li class="info_b">有效期：{{item.validity}}天</li>
                <li class="info_c"><span>{{item.discount}}折优惠&nbsp;&nbsp;&nbsp;更多特权</span></li>
            </ul>
        </div> -->
    </div>

  </div>
</template>

<script>
  import controller from "./card_open_membership_controller";
  export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
 #open_member{
    padding-top:40px;
    padding-bottom: 1.25rem;
    #content{
        .type_a{
            background-image: url(../../../assets/images/card_a.png);
            background-size:18.75rem 11.0625rem;
            background-repeat: no-repeat;
            .name{
                background: linear-gradient(to right, rgba(224, 203, 164, 0), rgba(184,151,99,1));
            }
            .info_c{
                span{
                    background: linear-gradient(to right, rgba(184,151,99,1), rgba(224, 203, 164, 1));
                }   
            }
        }
        .type_b{
            background-image: url(../../../assets/images/card_b.png);
            background-size:18.75rem 11.0625rem;
            background-repeat: no-repeat;
            .name{
                background: linear-gradient(to right, rgba(119, 118, 130, 0), rgba(67,66,71,1));
            }
            .info_c{
                span{
                    background: linear-gradient(to right,  rgba(67,66,71,1), rgba(119, 118, 130, 1));
                }
            }
        }
        .type_c{
            background-image: url(../../../assets/images/card_c.png);
            background-size:18.75rem 11.0625rem;
            background-repeat: no-repeat;
            .name{
                background: linear-gradient(to right, rgba(143, 133, 133, 0), rgba(86,71,64,1));
            }
            .info_c{
                span{
                    background: linear-gradient(to right, rgba(86,71,64,1), rgba(143, 133, 133, 1));
                } 
            }
        }
        .type_a,.type_b,.type_c{
            width: 18.75rem;
            height: 11.0625rem;
            border-radius: 0.5rem;
            margin:1.25rem auto;
            box-shadow: 0rem 0.125rem 0.5rem #ccc;
            .top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding:1rem 0.75rem;
                li:first-child{
                  padding: 0 0.625rem;
                  // background: #f15353;
                  color:#fff;
                  font-size: 14px;
                  display: flex;
                  line-height: 1.75rem;
                  
                  i{
                    font-size: 1.25rem;
                    color:#fff;
                    line-height: 1.75rem;
                    margin-right: 0.375rem;
                  }
                }
                li:last-child{
                  button{
                    border:none;
                    width: 4.375rem;
                    height: 1.5rem;
                    border-radius: 1.875rem;
                    background: #fff;
                    color:#333;
                    font-size: 13px;
                  }
                }
            }
            .info{
              color:#fff;
                .info_a{
                  font-size: 16px;
                  span{
                    font-size: 36px;
                    font-weight: bold;
                  }
                }
                .info_b{
                  font-size: 14px;
                  line-height: 1.75rem;
                }
                .info_c{
                  span{
                    font-size: 14px;
                    line-height: 1.75rem;
                    padding: 0.125rem 0.625rem;
                  }
                  
                }
            }
        }
    // new
    .vip_box{
        width: 22.1875rem;
        border-radius: 0.25rem;
        margin: 0.625rem auto;
        background: #fff;
        display: flex;
        align-items: center;
        padding: 1.25rem 0.875rem;
        position: relative;
        .img{
            width:4.5rem;
            height: 4.5rem;
            border-radius: 3.75rem;
            background: #ccc;
            overflow: hidden;
            margin-right: 0.625rem;
            img{
              width:4.5rem;
              height: 4.5rem;
            } 
        }
        .text{
            text-align: left;
            .text_a{
                font-size: 18px;
                font-weight: bold;
                line-height: 1.875rem;
            }
            .text_b,.text_c{
                font-size: 14px;
                color:#8c8c8c;
                line-height: 1.5rem;
            }
        }
        .btn{
            position: absolute;
            right: 0.625rem;
            button{
                border:none;
                background: #daac5e;
                color:#fff;
                border-radius: 0.25rem;
                width: 5.5rem;
                height: 2.25rem;
                font-size: 16px;
            }
        }
    }
    }
 }
</style>
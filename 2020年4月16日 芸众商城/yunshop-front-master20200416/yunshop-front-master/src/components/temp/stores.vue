<template>
  <div>
    <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false'> -->
    <div class="store-list"
         @click="toRouter(items)"
         v-for="(items,i) in stores" :key='i'
         :style="{ 'background-color': datas.params.bgcolor }">
      <div class="store-img">
        <a class="store-logo">
          <span class="img-mask"
                v-if="items.operating_state === 1"></span>
          <span class="img-text"
                v-if="items.operating_state === 1">商家休息中</span>
          <img :src="items.thumb" />
        </a>
        <div class="store-category">
          <span @click.stop="toClassify(items.has_one_category.id)"
                class="da store-category-name"
                :style="{ color: datas.params.catecolor }">{{ items.has_one_category.name }}</span>
        </div>
      </div>
      <div class="store-intro">
        <div class="a8q ">
          <h2 class=""
              :style="{ color: datas.params.namecolor }">
            {{ items.store_name }}
          </h2>
        </div>
        <div class="a06 a8r">
          <strong class="i8">
            <!-- <span class="da" :style="{'color':datas.params.shipcolor}">{{items.dispatch}}</span> -->
            <span class="da"
                  :style="datas.params.shipcolor?('color:'+datas.params.shipcolor+';'):''">{{ items.dispatch.substring(0,(items.dispatch.length-1)) }}</span>
          </strong>
        </div>
        <div class="a8v order">
          <p class="a8d">
            <cStar :score="items.average_score"></cStar>
          </p>
          <p class="a8w"
             v-show="datas.params.showsale == 1">
            <span class="line_split"></span>月售{{ items.order_total }}单
          </p>
        </div>
        <div class="a8v"
             v-show="datas.params.showscore == 1"
             :class="{margin:datas.params.showlove == 1}">
          <p class="a8w">
            <span style="margin-right:0.625rem;"
                  :style="datas.params.salecolor?('color:'+datas.params.salecolor+';'):''"
                  v-if="items.store_point.point_switch == 0 ? false : true">{{ items.store_point.point }}</span><span :style="datas.params.salecolor?('color:'+datas.params.salecolor+';'):''"
                  v-if="items.store_point.point_deduct_switch == 0 ? false : true">{{ items.store_point.max_point_deduct }}</span>
          </p>
        </div>
        <div class="a8v"
             v-show="datas.params.showlove == 1">
          <p class="a8w">
            <span style="margin-right:0.625rem;"
                  :style="datas.params.salecolor?('color:'+datas.params.salecolor+';'):''"
                  v-if="items.store_love.award == 1 ? true : false">{{ items.store_love.award_proportion }}</span><span :style="{ color: datas.params.salecolor }"
                  v-if="items.store_love.deduction == 1 ? true : false">{{
              items.store_love.deduction_proportion
            }}</span>
          </p>
        </div>
      </div>
      <div class="store_honor_box">
        <div class="store_honor_icon1">
          <a :href="'tel:' + items.mobile">
            <!-- <i class="fa fa-phone" aria-hidden="true" :style="{'color':datas.params.telcolor}"
               style="font-size: 16px;margin-right: 0.9375rem;"></i> -->
            <i class="fa fa-phone"
               aria-hidden="true"
               style="font-size: 16px;margin-right: 0.9375rem;"
               :style="datas.params.telcolor?('color:'+datas.params.telcolor+';'):''"></i>
          </a>
          <i @click.stop="goToAdress(items)"
             class="fa fa-location-arrow"
             :style="datas.params.navcolor?('color:'+datas.params.navcolor+';'):''"
             aria-hidden="true"
             style="font-size: 16px;"></i>
        </div>
        <!-- <span class="store_honor_icon1" :style="{'color':datas.params.discolor}" style="font-size: 12px;">距离{{items.distance}}{{items.unit}}</span> -->
        <span class="store_honor_icon1"
              :style="datas.params.discolor?('color:'+datas.params.discolor+';'):''"
              style="font-size: 12px;">距离{{ items.distance }}{{ items.unit }}</span>
      </div>
    </div>
    <div id="allmap"></div>
    <div v-if="showMore">
      <div style="width: 100%;height: 40px;line-height: 40px;text-align: center;"
           v-if="loading"
           @click="getMoreStores">
        加载更多
      </div>
      <div style="width: 100%;height: 40px;line-height: 40px;text-align: center;"
           v-if="!loading">
        没有更多喽~
      </div>
    </div>

    <!-- </mt-loadmore> -->
  </div>
</template>
<script>
import cStar from "components/star";
import { Toast, MessageBox } from "mint-ui";
//import BMap from 'BMap';
export default {
  props: ["datas"],
  components: { cStar },
  data() {
    return {
      mid: this.fun.getKeyByMid(),
      toi: this.fun.getKeyByI(),
      location: this.$store.state.o2oLocation,
      point: {},
      city: "",
      stores: [],
      address: "",
      //setting sun
      //   allLoaded: true,
      //   loading: false,
      //   pageNum: 1,
      //   resState: false,
      //   pageState: false,
      loading: true,
      allLoaded: false,
      goload: true,
      isLoadMore: true,
      page: 1,
      total_page: 0,
      showMore: false,

      isActivated: false
    };
  },
  mounted() {
    this.initData();
  },
  created() {},
  activated() {
    this.isActivated = this.$store.state.isSwitchCity;
    console.log("切换了城市------------------------", this.isActivated);
    if (this.isActivated) {
      this.initData();
      this.$store.commit("setSwitchCity", false);
    }
  },
  updated() {
    // this.isActivated = true;
  },
  methods: {
    initData() {
      this.location = this.$store.state.o2oLocation;
      console.log("activated-location", this.location);
      if (this.location.point == undefined) {
        console.log("info===== not exists location.");
        this.ready();
      } else {
        this.point = this.location.point;
        this.city = this.location.city;
      }
      this.showMore = false;
      this.stores = [];
      this.loading = true;
      this.allLoaded = false;
      this.goload = true;
      this.isLoadMore = true;
      this.page = 1;
      this.total_page = 0;
      this.getStores();
    },
    toSeller(id) {
      this.$router.push({
        name: "HomeSeller",
        params: {
          store_id: id
        },
        query: {
          i: this.toi
        }
      });
    },
    //跳转至分类
    toClassify(id) {
      this.$router.push(
        this.fun.getUrl("o2oCategory", {
          id: id
        })
      );
    },
    goToAdress(items) {
      let point = this.fun.bd_decrypt(items.longitude, items.latitude);
      if (this.fun.isWeiXin()) {
        this.goToWXAdress(point, items);
      } else {
        window.location.href = `https://m.amap.com/navi/?dest=${point.lng},${
          point.lat
        }&destName=${items.store_name}&key=43de56d8e65fe042493541213d9ad7b0`;
      }
    },
    goToWXAdress(point, store) {
      $http
        .post(
          "member.member.wxJsSdkConfig",
          {
            url:
              this.fun.isIosOrAndroid() === "android"
                ? window.location.href
                : window.initUrl
          },
          " "
        )
        .then(
          response => {
            if (response.result === 1) {
              wx.config({
                debug: false,
                appId: response.data.config.appId,
                nonceStr: response.data.config.nonceStr,
                timestamp: response.data.config.timestamp,
                url: response.data.config.url,
                signature: response.data.config.signature,
                jsApiList: ["checkJsApi", "openLocation", "getLocation"]
              });

              wx.checkJsApi({
                jsApiList: ["getLocation"],
                success: function(res) {
                  if (res.checkResult.getLocation == false) {
                    alert(
                      "你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！"
                    );
                  }
                }
              });
              wx.ready(function() {
                wx.getLocation({
                  type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                  success: function(res) {
                    wx.openLocation({
                      latitude: point.lat, // 纬度，浮点数，范围为90 ~ -90
                      longitude: point.lng, // 经度，浮点数，范围为180 ~ -180。
                      name: store.store_name, // 位置名
                      address: store.address.detailed_address, // 地址详情说明
                      scale: 20 // 地图缩放级别,整形值,范围从1~28。默认为最大
                    });
                  },
                  cancel: function(res) {
                    alert("用户拒绝授权获取地理位置");
                  }
                });
              });

              wx.error(function(response) {
                console.log(response);
              });
            } else {
              Toast(response.msg);
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },
    toRouter(item) {
      if (item.specify_show == 1) {
        this.$router.push(
          this.fun.getUrl("o2oStore_v2", {
            store_id: item.id
          })
        );
      } else {
        this.$router.push(
          this.fun.getUrl("HomeSeller", {
            store_id: item.id
          })
        );
      }
    },
    ready: function() {
      //this.getLocation();
      var myLocation = this.$store.state.o2oLocation;
      if (myLocation.point) {
        this.address = myLocation.title;
        this.city = myLocation.city;
        this.point = myLocation.point;
        console.log("myLocation:", myLocation);
        this.$store.commit("updateLocation", myLocation);
        //初始化数据
        // this.getStores();
        //this.getStoresCategory();
      } else {
        console.log("location不存在");
        this.getLocation();
      }
    },
    getLocation() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");
      mapObj.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); // 返回定位信息
        AMap.event.addListener(geolocation, "error", onError); // 返回定位出错信息
      });

      function onComplete(obj) {
        var res =
          "经纬度：" +
          obj.position +
          "\n精度范围：" +
          obj.accuracy +
          "米\n定位结果的来源：" +
          obj.location_type +
          "\n状态信息：" +
          obj.info +
          "\n地址：" +
          obj.formattedAddress +
          "\n地址信息：" +
          JSON.stringify(obj.addressComponent, null, 4);
        //alert(JSON.stringify(obj.addressComponent, null, 4));
        var position = obj.position.toString().split(",");
        that.point = {
          lat: position[1],
          lng: position[0]
        };
        that.address = obj.formattedAddress;
        that.title = obj.formattedAddress;
        that.city = !that.fun.isTextEmpty(obj.addressComponent.city)
          ? obj.addressComponent.city
          : obj.addressComponent.province;

        var pos = {
          address: obj.formattedAddress,
          city: that.city,
          title: obj.formattedAddress,
          point: that.point
        };
        console.log("test pos", pos);
        that.$store.commit("updateLocation", pos);
        that.$store.commit("setLocation", pos);
        //setting sun
        that.pageNum = 1;
        that.loading = true;
        that.stores = [];
        that.getStores();
      }

      function onError(obj) {
        //alert(obj.info + '--' + obj.message);
        console.log(obj);
      }

      /*var that = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            console.log('temp stores 您的位置ok：', r);
            that.address = r.address.city;
            that.city = r.address.city;
            that.point = r.point;
            var pos = {
              address: that.address,
              city: that.city,
              title: that.address,
              point: that.point,
            }
            //this.balance = this.$store.state.balance;
            that.$store.commit('updateLocation', pos);
            that.$store.commit('setLocation', pos);
            //window.localStorage.setItem("myLocation",JSON.stringify(pos));
            //setting sun
            this.pageNum = 1;
            this.loading = false;
            that.getStores();
          } else {
            //todo, 获取收货地址
            that.getStores();
          }
        }, {
          enableHighAccuracy: true
        })*/
    },
    tolocation() {
      this.$router.push(this.fun.getUrl("o2oLocation"));
    },
    getStores() {
      var that = this;
      var p = this.fun.bd_encrypt(this.point.lng, this.point.lat);

      //that.getStoresCategory();
      $http
        .get(
          "plugin.store-cashier.frontend.store.store.get-store-list-to-page",
          {
            page: this.page,
            kwd: "",
            lng: p.lng,
            lat: p.lat,
            city_name: this.city,
            pagesize: this.datas.params.num
          }
        )
        .then(
          response => {
            if (response.result === 1) {
              this.showMore = true;
              this.stores = response.data.data;
              if (response.data.last_page) {
                that.total_page = response.data.last_page;
              } else if (response.data.lastPage) {
                that.total_page = response.data.lastPage;
              }
              if (that.page >= that.total_page) {
                that.loading = false;
              } else {
                that.loading = true;
              }
            }
          },
          response => {
            //alert('网络错误，请稍后再试！')
          }
        );
    },
    // upOther(response) {
    //   if (this.pageNum == 1) {
    //     this.stores = [];
    //   }
    //   this.pageNum = Number(this.pageNum) + 1;
    //   this.loading = false;
    //   this.allLoaded = false;
    //   // 搜索结果为空
    //   if (response.data.total <= 0) {
    //     this.loading = true;
    //     this.allLoaded = true;
    //     return;
    //   }
    //   this.stores = this.stores.concat(response.data.data);
    //   console.log("商品内容", this.stores);
    //   if (response.data.current_page == response.data.last_page) {
    //     this.loading = true;
    //     this.allLoaded = true;
    //     return;
    //   }
    // },
    getMoreStores() {
      var that = this;
      if (this.page == this.total_page) {
        that.loading = false;
        return;
      }
      if (this.page > this.total_page) {
        that.loading = false;
        return;
      } else {
        this.page = this.page + 1;
        var p = this.fun.bd_encrypt(this.point.lng, this.point.lat);

        $http
          .get(
            "plugin.store-cashier.frontend.store.store.get-store-list-to-page",
            {
              page: that.page,
              kwd: "",
              lng: p.lng,
              lat: p.lat,
              city_name: that.city,
              pagesize: that.datas.params.num
            },
            "加载中..."
          )
          .then(
            function(response) {
              if (response.result === 1) {
                var myData = response.data.data;
                that.loading = true;
                that.allLoaded = false;
                that.stores = that.stores.concat(myData); //数组拼接
                if (that.page == that.total_page) {
                  that.loading = false;
                  console.log("最后一页");
                }
              } else {
                that.page = that.page - 1;
                that.loading = true;
                that.allLoaded = true;
                that.isLoadMore = false;
              }
            },
            function(response) {
              // error callback
            }
          );
      }
    },
    loadTop() {
      this.initData();
      this.getStores();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
      if (this.isLoadMore) {
        this.getMoreStores(this.page);
        this.$refs.loadmore.onBottomLoaded();
      } else {
        console.log("没有更多数据");
      }
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.p1 {
  position: relative !important;
}

.store-category-name {
  text-align: center;
  width: 4rem;
  display: block;
  word-wrap: break-word;
}

.store-list {
  display: flex;
  padding: 0.75rem;
  border-top: 0.0625rem solid #e7e9e4;
  /*width: 97%;*/
  background: #fff;
  font-size: 12px;
  /*font-size: .9rem;*/
  color: #333;
  text-align: left;
  position: relative;
}

.store-img {
  /*position: relative;*/
  display: flex;
  flex-direction: column;
}

.store-img .store-logo {
  /*position: absolute;*/
  /*left: 0.625rem;*/
  /*top: 0;*/
  /*bottom: 0;*/
  /*float: none;*/
  width: 4rem;
  height: 4rem;
  .img-mask {
    position: relative;
    top: 60%;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 40%;
    border: 0.0625rem solid #e8e8e8;
    display: inline-block;
    margin-right: 0.5rem;
    font-size: 12px;
    background-color: #3b4043;
    opacity: 0.6;
  }
  .img-text {
    position: relative;
    top: 20%;
    left: 3%;
    z-index: 15;
    width: 100%;
    height: 40%;
    display: inline-block;
    margin-right: 0.5rem;
    font-size: 12px;
    color: white;
  }
}

.store-img img {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  width: 4rem;
  height: 4rem;
  border: 0.0625rem solid #e8e8e8;
  display: inline-block;
}

.store-intro {
  width: 11.25rem;
  display: inline-block;
  position: relative;
  margin-left: 0.625rem;
}

.store-intro .a8q {
  height: 1.25rem;
  line-height: 1.25rem;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-box;
  display: -ms-flexbox;
  display: flex;
  -moz-flex: 1;
  -ms-flex: 1;
  -webkit-box-flex: 1;
  flex: 1;
}

.store-intro .a8q h2 {
  font-size: 16px;
  color: #333;
  /*overflow: hidden;*/
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  margin-top: 0;
  font-weight: bold;
  -moz-flex: 1;
  -ms-flex: 1;
  -webkit-box-flex: 1;
  flex: 1;
}

.store-intro .a8q .store_honor_icon1 {
  display: inline-block;
  width: 5.5rem;
  height: 1.25rem;
  font-size: 12px;
  text-align: right;
  margin-right: 0.125rem;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 1rem auto;
}

.store-intro .a8r {
  font-size: 0;
  padding-top: 0.625rem;
  overflow: hidden;
}

.store-intro .a8r .i8 {
  display: inline-block;
  background-color: #f5f5f5;
  font-size: 0;
  border-radius: 0.125rem;
  color: #18bdad !important;
  line-height: 0; // height: 0.9375rem;
  overflow: hidden;
}

.store-intro .a8r .i8 .da {
  display: inline-block;
  line-height: 1;
  padding: 0.125rem;
  font-size: 10px;
}

.store-intro .a8v {
  height: 0.875rem;
  font-size: 0;
}
.store-intro .margin {
  margin-bottom: 0.5rem;
}
.order {
  display: flex;
}

.store-intro .a8v .a8d {
  // height: 12px;
  /*padding-top: 2px;*/
  overflow: hidden;
  display: inline-block;
  position: relative;
}

.store-intro .a8v .a8d .a79 {
  display: inline-block;
  font-size: 0;
}

.store-intro .a8v .a8d .a79 i {
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
  background-position: 0 0;
  background-image: url(//static-o2o.360buyimg.com/daojia/new/images/icon/newStar.png);
  background-repeat: no-repeat;
  background-size: auto 0.625rem;
  margin-right: 0.0625rem;
}

.store-intro .a8v .a8d .a79 .zo {
  background-position: -0.625rem 0;
}

.store-intro .a8v .a8w {
  font-size: 11px;
  line-height: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
  display: inline-block;
  span {
    color: #ff9800;
  }
}

.store-intro .a8v .a8w .line_split {
  display: inline-block;
  width: 0.5rem;
  height: 0.625rem;
  background: url(//static-o2o.360buyimg.com/daojia/new/images/index/icon_line_split.jpg)
    no-repeat center 0.125rem;
}

.store_honor_box {
  display: inline-block;
  position: absolute;
  // top: 0.625rem;
  text-align: right;
  right: 1rem;
  span {
    color: #8c8c8c;
  }
  .fa {
    color: #18bdad;
  }
}

.store_honor_icon1 {
  display: block;
  color: #18bdad;
}

.store-category {
  // position: absolute;
  /*top: 4.375rem;*/
  /*left: 1.125rem;*/
}
</style>

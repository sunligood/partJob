import cTitle from "components/title";
import loading from "components/loading";
import { Toast, MessageBox, Indicator } from "mint-ui";

export default {
  data() {
    return {
      isShow: false,
      category: [],
      mainInfo: {},
      telephone: "",
      info: {},
      infoShow: false
    };
  },
  //computed: mapState(['mailInfo']),
  mounted() {},
  created() {},
  activated() {
    this.init();
    this.getStoreInfo();
    this.initShare();
    // this.getStoresCategory();
    // this.getStore();
    // this.getStoreDetail();
  },
  methods: {
    getStoreInfo() {
      $http
        .post(
          "plugin.store-cashier.frontend.store.get-store-info.get-the-provider",
          {
            store_id: this.$route.params.store_id,
            url:
              this.fun.isIosOrAndroid() === "android"
                ? window.location.href
                : window.initUrl
          }, "loading"
        )
        .then(response => {
          this.isShow = true;
          if (response.result === 1) {
            this.getStore(response.data.store_info);
            if (!this.fun.isTextEmpty(response.data.store_information)) {
              this.info = response.data.store_information;
              this.infoShow = true;
            }
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取页面主要信息
    getStore(data) {
      // $http
      //   .get(
      //     "plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id",
      //     { store_id: this.$route.params.store_id }
      //   )
      //   .then(response => {
      // console.log(response.data);
      // if (response.result === 1 && !this.fun.isTextEmpty(response.data)) {
      this.mainInfo = data;
      this.telephone = "tel:" + data.store_mobile;
      //   }
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },

    // getStoresCategory() {
    //   $http
    //     .get("plugin.store-cashier.frontend.store.store-category.get-list")
    //     .then(response => {
    //       if (response.result == 1) {
    //         this.category = response.data;
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },

    getStoreDetail() {
      $http
        .get(
          "plugin.store-cashier.frontend.store.store-home.get-store-information",
          { store_id: this.$route.params.store_id }
        )
        .then(response => {
          console.log(response);
          if (
            response.result == 1 &&
            !this.fun.isTextEmpty(response.data.information)
          ) {
            this.info = response.data.information;
            this.infoShow = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    goToShop() {
      this.$router.push(
        this.fun.getUrl("o2oStore_v2", {
          store_id: this.$route.params.store_id,
          fromHome: 1
        })
      );
    },

    goToDetail() {
      this.$router.push(
        this.fun.getUrl("HomeSellerDetail", {
          store_id: this.$route.params.store_id
        })
      );
    },

    goToAdress() {
      let point = this.fun.bd_decrypt(this.mainInfo.lng, this.mainInfo.lat);
      //window.location.href="http://api.map.baidu.com/marker?location="+this.mainInfo.lat+","+this.mainInfo.lng+"&title=商家位置&content="+this.mainInfo.store_name+"&output=html";
      if (this.fun.isWeiXin()) {
        this.goToWXAdress(point, this.mainInfo);
      } else {
        window.location.href = `https://m.amap.com/navi/?dest=${point.lng},${point.lat}&destName=${this.mainInfo.store_name}&key=43de56d8e65fe042493541213d9ad7b0`;
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
                      address: "门店地址", // 地址详情说明
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

    goToCrash() {
      this.$router.push(
        this.fun.getUrl("cashier_pay", {
          store_id: this.$route.params.store_id
        })
      );
    },

    init() {
      this.isShow = false;
      this.category = [];
      this.mainInfo = {};
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },

    //分享

    initShare() {
      let that = this;
      let _url = document.location.href;
      let json = { url: _url };
      $http
        .post("member.member.wxJsSdkConfig", json)
        .then(response => {
          if (response.result == 1) {
            if (response.data.config) {
              that.share(response.data);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    share(data) {
      let that = this;

      wx.config(data.config);
      wx.ready(function() {
        let _title = that.fun.isTextEmpty(that.mainInfo.store_name)
          ? data.share.title
          : that.mainInfo.store_name;

        let _link = document.location.href + "&share_tag=2";
        _link = that.fun.isMid(_link, data.info.uid);

        let _imgUrl = that.fun.isTextEmpty(that.mainInfo.store_thumb)
          ? data.share.icon
          : that.mainInfo.store_thumb;
        let _desc = that.fun.isTextEmpty(that.mainInfo.store_introduce)
          ? data.share.desc
          : that.mainInfo.store_introduce;

        wx.showOptionMenu();
        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });

        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: "link", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });

        // if(that.fun.getWechatVersion()){
        //   wx.updateTimelineShareData({
        //     title: _title, // 分享标题
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     success: function () {
        //       //Toast("分享成功");
        //     },
        //     // cancel: function () {
        //     //   Toast("取消分享");
        //     // }
        //   });

        //   wx.updateAppMessageShareData({
        //     title: _title, // 分享标题
        //     desc: _desc, // 分享描述
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     //type: 'link', // 分享类型,music、video或link，不填默认为link
        //     //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        //     success: function () {
        //       //Toast("分享成功");
        //     },
        //     // cancel: function () {
        //     //   Toast("取消分享");
        //     // }
        //   });
        // }else{
        //   wx.onMenuShareTimeline({
        //     title: _title, // 分享标题
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     success: function () {
        //       Toast("分享成功");
        //     },
        //     cancel: function () {
        //       Toast("取消分享");
        //     }
        //   });

        //   wx.onMenuShareAppMessage({
        //     title: _title, // 分享标题
        //     desc: _desc, // 分享描述
        //     link: _link, // 分享链接
        //     imgUrl: _imgUrl, // 分享图标
        //     type: 'link', // 分享类型,music、video或link，不填默认为link
        //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        //     success: function () {
        //       Toast("分享成功");
        //     },
        //     cancel: function () {
        //       Toast("取消分享");
        //     }
        //   });
        // }
      });
    }
  },

  components: { cTitle, loading },

  compiled() {}
};

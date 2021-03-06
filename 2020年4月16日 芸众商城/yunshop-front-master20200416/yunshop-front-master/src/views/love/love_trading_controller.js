import cTitle from "components/title";
import { MessageBox } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { CellSwipe } from "mint-ui";

const status_type_0 = "";
const status_type_1 = "0";
const status_type_2 = "1";
const status_type_3 = "2";
var isclick = true;

export default {
  data() {
    return {
      selected: "0",
      display: 1,
      pagesize: 1,
      //待使用
      wait_used: [],
      //已过期
      overdue: [],
      used: [],
      loading: false,
      allLoaded: false,
      goload: true,
      isLoadMore: true,
      page: 1,
      total_page: 0,
      love_name: "", //爱心值自定义名称
      usable: 0, // 登陆会员可用爱心值
      guidePrice: 0, // 指导价
      allCount: 0, // 总交易量(已完成数量) 2020年4月18日
      todayCount: 0 // 今日(已完成数量) 2020年4月18日
    };
  },
  methods: {
    initData() {
      this.page = 1;
      this.goload = true;
      this.total_page = 0;
      this.loading = true;
      this.allLoaded = false;
      this.isLoadMore = true;
    },
    //更新
    loadTop() {
      this.initData();
      this.getNetData(this.selected);
      this.$refs.coupon_loadmore.onTopLoaded();
    },
    // 加载更多
    loadBottom() {
      //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件

      if (this.isLoadMore) {
        this.getMoreData(this.page, this.selected);
        this.$refs.coupon_loadmore.onBottomLoaded();
      } else {
        console.log("没有更多数据");
      }
    },

    switchItem() {
      //this.initData();
      if (this.selected == 0) {
        this.getNetData(status_type_0);
      } else if (this.selected == 1) {
        this.getNetData(status_type_1);
      } else if (this.selected == 2) {
        this.getNetData(status_type_2);
      } else if (this.selected == 3) {
        this.getNetData(status_type_3, 1);
      }
    },

    //发起http请求
    getNetData(status, own = "") {
      var that = this;
      $http
        .get(
          "plugin.love.Frontend.Modules.Trading.Controllers.trading.trading-center",
          { status: status, own: own, page: 1 },
          "正在获取"
        )
        .then(
          function (response) {
            if (response.result == 1) {
              var myData = response.data;
              that.total_page = response.data.total;
              if (status == "") {
                that.wait_used = [];
                that.underway = [];
                that.done = [];
                that.own = [];
                that.wait_used = myData;
                // 计算总成交量,当前出售量 2020年4月18日
                that.getallCount(myData)
                that.getTodayCount(myData)
              } else if (status == "0") {
                that.wait_used = [];
                that.underway = [];
                that.done = [];
                that.own = [];
                that.underway = myData;
              } else if (status == "1") {
                that.wait_used = [];
                that.underway = [];
                that.done = [];
                that.own = [];
                that.done = myData;
              } else if (status == "2") {
                that.wait_used = [];
                that.underway = [];
                that.done = [];
                that.own = [];
                that.own = myData;
              }
            } else {
              MessageBox.alert(response.msg);
              //Toast(response.msg);
            }
          },
          function (response) {
            // error callback
          }
        );
    },
    getMoreData(page, type) {
      var that = this;
      if (this.page == this.total_page) {
        return;
      }
      if (this.page >= this.total_page) {
        that.loading = true;
        that.allLoaded = true;
        return;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            "coupon.member-coupon.coupons-of-member-by-status",
            {
              status_request: type,
              page: this.page,
            },
            "正在获取更多订单"
          )
          .then(
            function (response) {
              if (response.result == 1) {
                var myData = response.data;

                that.loading = false;
                that.allLoaded = false;
                if (index == 1) {
                  that.wait_used = that.wait_used.concat(myData.data); //数组拼接
                } else if (index == 2) {
                  that.overdue = that.overdue.concat(myData.data);
                } else {
                  that.used = that.used.concat(myData.data);
                }
              } else {
                that.page = that.page - 1;
                that.loading = true;
                that.allLoaded = true;
                that.isLoadMore = false;
                return;
              }
            },
            function (response) {
              // error callback
            }
          );
      }
    },
    revoke(id) {
      if (isclick) {
        isclick = false;
        $http
          .get(
            "plugin.love.Frontend.Modules.Trading.Controllers.trading.revoke",
            { id: id },
            "加载中"
          )
          .then(
            response => {
              setTimeout(function () {
                isclick = true;
              }, 1000);
              if (response.result == 1) {
                MessageBox.alert(response.msg).then(action => {
                  this.switchItem(this.selected);
                });
              } else {
                MessageBox.alert(response.msg);
              }
            },
            function (response) {
              setTimeout(function () {
                isclick = true;
              }, 1000);
              MessageBox.alert(response);
            }
          );
      }
    },
    purchase(id) {
      if (isclick) {
        isclick = false;
        $http
          .get(
            "plugin.love.Frontend.Modules.Trading.Controllers.trading.purchase",
            { id: id },
            "加载中"
          )
          .then(
            response => {
              setTimeout(function () {
                isclick = true;
              }, 1000);
              if (response.result == 1) {
                MessageBox.alert(response.msg).then(action => {
                  this.switchItem(this.selected);
                });
              } else {
                MessageBox.alert(response.msg);
              }
            },
            function (response) {
              setTimeout(function () {
                isclick = true;
              }, 1000);
              MessageBox.alert(response);
            }
          );
      }

    },
    getUsable() {
      $http
        .get("plugin.love.Frontend.Controllers.page.index", {}, "加载中")
        .then(
          response => {
            if (response.result === 1) {
              this.love_name = response.data.love_name;
              this.guidePrice = Number(response.data.trading_set.trading_money).toFixed(2); // 2020年4月21日 add 指导价
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function (response) {
            MessageBox.alert(response);
          }
        );
    },
    // 计算总成交量 2020年4月18日
    getallCount(myData) {
      let amount = 0
      if (myData && Array.isArray(myData) && myData.length) {
        myData.forEach(item => {
          if (item.status === 1)
            amount = amount + Number(item.amount)
        })
      }
      this.allCount = amount
    },
    // 计算总成交量 2020年4月18日
    getTodayCount(myData) {
      let amount = 0
      if (myData && Array.isArray(myData) && myData.length) {
        myData.forEach(item => {
          let date = new Date()
          let nowDate = `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)}-${date.getDate()}`
          if (item.status === 1 && item.created_at.substr(0, 10) === nowDate) {
            amount = amount + Number(item.amount)
          }
        })
      }
      this.todayCount = amount
    },

    // 点击出售,跳转出售页面 2020年4月18日
    goSell(url) {
      this.$router.push(this.fun.getUrl(url));
    }
  },
  activated() {
    //this.selected = 0;
    //this.initData();
    this.own = [];
    this.done = [];
    this.wait_used = [];
    this.underway = [];
    this.getUsable();
    this.switchItem();
    // this.$on('selected_coupon', (params) => {
    //     console.log(params.coupon_id);
    // });
  },
  components: { cTitle }
};

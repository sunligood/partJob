import cTitle from "components/title";
import { MessageBox } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      store: {
        name: "",
        thumb: ""
      },
      income: {
        money_total: 0.0,
        sure_withdraw_money: 0.0
      }
    };
  },
  activated() {
    this.toi = this.fun.getKeyByI();
    //获取数据
    this.getStoreInfo();
    this.fun.setWXTitle(this.fun.initWithdrawal());
  },
  methods: {
    getStoreInfo() {
      var that = this;
      $http
        .get("plugin.store-cashier.frontend.cashier.center.index", {
          i: this.fun.getKeyByI(),
          type: this.fun.getTyep()
        })
        .then(
          function(response) {
            console.log("cashier::", response);
            if (response.result == 1) {
              console.log("cashier::", response.data);
              that.store = response.data.store;
              that.income = response.data.income;
              //that.credit = myData.credit;
            } else {
              MessageBox.alert(response.msg);
            }
          },
          function(response) {
            // error callback
          }
        );
    },
    confirm() {
      var that = this;

      if (
        this.income.sure_withdraw_money == undefined ||
        this.income.sure_withdraw_money <= 0
      ) {
        MessageBox.alert(
          `${this.fun.initWithdrawal()}` + "金额不可低于0元",
          "提示"
        );
        return;
      }

      $http
        .get(
          "plugin.store-cashier.frontend.cashier.withdraw.apply",
          { i: this.fun.getKeyByI(), type: this.fun.getTyep() },
          "正在提交数据..."
        )
        .then(
          function(response) {
            if (response.result === 1) {
              that.$router.push(that.fun.getUrl("withdrawal"));
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
    }
  },

  components: { cTitle }
};

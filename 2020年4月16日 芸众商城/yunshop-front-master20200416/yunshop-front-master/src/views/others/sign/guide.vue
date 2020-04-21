<template>
  <div class="white">
    <c-title :hide="false" :text="'认证引导'">
    </c-title>
    <div style="height: 40px"></div>
    <div v-html="content"></div>
    <div style="height: 3.5rem"></div>
    <div class="btn" :class="[fun.getPhoneEnv() == 3 ? 'pcStyle' : '']">
      <p class="sure" v-if="show == 'identify'" @click="toSign">立即认证</p>
      <p class="sure" v-if="show == 'good'" @click="toBuy">立即购买</p>
    </div>
  </div>
</template>

<script>
  import cTitle from "components/title";
  import { Toast, MessageBox } from "mint-ui";

  export default {
    data() {
      return {
        show: "",
        content: "",
        Buy: {},
        Sign: {}
      };
    },
    activated() {
      this.show = this.$route.params.show;
      if (this.show == "good") {
        this.getBuyData();
      } else {
        this.getSignData();
      }
    },
    methods: {
      toBuy() {
        if (this.Buy.has_buy == 1) {
          this.$router.push(this.fun.getUrl("signIndex"));
        } else {
          this.$router.push(
            this.fun.getUrl("goodsorder", {
              tag: "-2",
              goodsId: this.Buy.activity_goods_id,
              optionsId: "",
              total: 1
            })
          );
        }
      },
      toSign() {
        if (this.Sign.person_status == 1) {
          this.$router.push(this.fun.getUrl("signCompany"));
        } else {
          this.$router.push(this.fun.getUrl("personBank"));
        }
      },
      getBuyData() {
        $http
          .get("plugin.yun-sign.frontend.h5.activity.get-info", {}, "...").then(response => {
            if (response.result === 1) {
              this.Buy = response.data;
              this.content = this.Buy.desc;
            } else {
              Toast(response.msg);
            }
          },
          response => {
            MessageBox.alert(response.msg);
          }
        );
      },
      getSignData() {
        $http
          .get("plugin.yun-sign.frontend.h5.auth.get-desc", {}, "...").then(response => {
            if (response.result === 1) {
              this.Sign = response.data;
              this.content = this.Sign.desc;
            } else {
              Toast(response.msg);
            }
          },
          response => {
            MessageBox.alert(response.msg);
          }
        );
      }
    },
    components: { cTitle }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .white {
    background: white;
    height: 100vh;
  }

  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #FFFFFF;
    .sure {
      font-size: 18px;
      line-height: 2.25rem;
      width: 80%;
      margin: 10px auto;
      height: 2.25rem;
      background-color: #377aff;
      border-radius: 20px;
      color: #FFFFFF;
    }
  }

  .pcStyle {
    width: 375px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

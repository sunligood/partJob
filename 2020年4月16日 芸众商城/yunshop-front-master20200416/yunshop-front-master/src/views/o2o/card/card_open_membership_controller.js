import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";

const OPEN_URL = "";
const OPEN_INDEX_URL = "plugin.universal-card.api.home.get-level";

export default {
  data() {
    return {
      listArr: []
    };
  },

  activated() {
    this.initData();
    this.getData();
  },

  mounted() {},
  methods: {
    initData() {
      this.listArr = [];
    },

    getData() {
      $http
        .get(OPEN_INDEX_URL, {}, "加载中")
        .then(res => {
          if (res.result == 1) {
            this.listArr = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    openSubmit(value) {
      //判断是否有周期，有周期跳转至选择周期,没有周期直接订单页
      if (!this.fun.isTextEmpty(value.has_one_universal_level.goods_spec)) {
        this.$router.push(
          this.fun.getUrl("CardChooseMembership", {
            goods_id: value.goods_id,
            level_id: value.has_one_universal_level.member_level_id
          })
        );
      } else {
        //this.$router.push(this.fun.getUrl("goods",{id:value.goods_id}));
        //普通商品
        this.$router.push(
          this.fun.getUrl("goodsorder", {
            tag: "-2",
            optionsId: "",
            goodsId: value.goods_id,
            total: 1
          })
        );
      }
    }
  },
  components: { cTitle }
};

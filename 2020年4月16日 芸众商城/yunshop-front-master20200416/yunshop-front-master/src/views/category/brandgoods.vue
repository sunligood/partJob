<template>
  <div id="search"
       transition="fadeInLeft">
    <div id="soso"
         class="uou"
         :class="{ mout: amout }"
         :style="{width:(this.fun.getPhoneEnv() == 3?'375px':'100%')}">
      <div class="search">
        <mt-button slot="prepend"
                   style="background: #fff;box-shadow: none;"
                   icon="back"
                   @click="goback"></mt-button>
        <div class="searchBox">
          <form @submit.prevent
                action="#">
            <input type="search"
                   placeholder="搜索当前品牌商品标题"
                   @keypress="enterSearch"
                   v-model="inputs" />
          </form>
          <div class="img-icon"
               @click="search">
            <div class="img-icon-btn"></div>
          </div>
        </div>

        <div style="position:absolute;right: 1rem;top: 1rem;">
          <i class="fa fa-th-large"
             v-show="view"
             @click="$store.commit('views')"></i>
          <i class="fa fa-th-list"
             v-show="!view"
             @click="$store.commit('views')"></i>
        </div>
      </div>
      <c-sort :goods="datas"
              v-on:sortIn="sortOut"
              text="搜索结果"></c-sort>
    </div>
    <div style="height: 2.5rem;display: block;"></div>
    <div class="page-loadmore-wrapper"
         ref="wrapper"
         :style="{ height: wrapperHeight + 'px' }"
         v-if="hidden">
      <mt-loadmore :top-method="loadTop"
                   @top-status-change2="handleTopChange"
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   ref="loadmore"
                   topPullText=""
                   topDropText="释放刷新"
                   topLoadingText=""
                   bottomPullText=""
                   bottomDropText="下拉加载..."
                   bottomLoadingText="">
        <c-goodsList :goods="datas"
                     text="搜索结果"
                     class="osll"
                     :loading="loading"></c-goodsList>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import cGoodsList from "components/goodsList";
import cSort from "components/sort";

var n = 1;
export default {
  data() {
    return {
      hidden: true,
      title: "搜索",
      inputs: "",
      amout: false,
      loading: false,
      allLoaded: true,
      topStatus: "",
      bottomStatus: "",
      wrapperHeight: 0,
      datas: []
    };
  },
  computed: {
    ...mapState(["message", "blurst", "view"]),
    zoneId() {
      if (this.$store.state.zoneId == "") {
        this.$store.commit("setZoneId", window.localStorage.getItem("zoneId"));
      }
      return this.$store.state.zoneId;
    }
  },

  methods: {
    ...mapMutations(["views"]),
    enterSearch(event) {
      if (event.keyCode === 13) {
        //如果按的是enter键
        event.preventDefault();
        this.search();
      }
    },
    sortOut(e) {
      if (this.datas.length == 0) {
        return;
      }
      console.log("得到的信息", e);
      n = 1;
      this.datas = [];
      this.order_field = e.order_field;
      this.order_by = e.order_by;
      this.gotoSearch(n);
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    //更新
    loadTop() {
      n = 1;
      this.datas = [];
      this.gotoSearch(n);
      this.$refs.loadmore.onTopLoaded();
    },
    // 加载更多
    loadBottom() {
      console.log("加载更多启动");
      n++;
      this.gotoSearch(n);
      this.$refs.loadmore.onBottomLoaded();
    },

    slider() {
      let that = this;
      window.onscroll = function() {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if (top < 80) {
          that.amout = false;
        } else {
          that.amout = true;
        }
      };
    },
    goback() {
      this.hidden = false;
      localStorage.setItem("isset", 1);
      this.$router.go(-1);
    },
    search() {
      n = 1;
      this.datas = [];
      this.gotoSearch(n);
    },
    gotoSearch(page = 1) {
      let json = {
        keywords: this.inputs,
        page: page,
        brand_id: this.$route.params.id,
        as_id: this.zoneId,
        order_field: this.order_field,
        order_by: this.order_by
      };

      $http.get("goods.goods.get-goods-brand-list", json).then(json => {
        if (json.result == 1) {
          this.loading = false;
          this.allLoaded = false;
          // 搜索结果为空
          if (json.data.goods.data.length <= 0) {
            this.loading = true;
            this.allLoaded = true;
            return;
          }
          // 如果当前页数大于总页数 就不加载了
          if (json.data.goods.current_page > json.data.goods.last_page) {
            this.loading = true;
            this.allLoaded = true;
            return;
          }
          this.datas.push(...json.data.goods.data);
          if (json.data.goods.data.length < 20) {
            this.loading = true;
            this.allLoaded = true;
            return;
          }
        } else {
          console.log("请求有问题,错误信息：", json.msg);
        }
      });
    }
  },
  activated() {
    this.hidden = true;
    this.isset = localStorage.getItem("isset");
    if (this.isset && this.$route.params.fromHome !== 1) {
      // localStorage.removeItem("isset");
      this.wrapperHeight = window.scrollTo(0, 0);
    }
    //keep分类不相同时，重载数据
    // this.datas = [];
    // this.inputs = '';
    //this.loadMore();
    else if (this.$route.params.fromHome !== 1) {
      // 不是从上一级点进的不清空
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
      // this.wrapperHeight=window.scrollTo(0,0)
    } else {
      // this.wrapperHeight = 83;
      this.wrapperHeight = window.scrollTo(0, 0);
      n = 1;
      this.datas = [];
      this.inputs = "";
      this.gotoSearch(n);
    }
  },
  created() {
    // this.hidden = true;
    // this.isset = sessionStorage.getItem("isset");
    // if (this.isset) {
    //   sessionStorage.removeItem("isset");
    //   this.wrapperHeight = window.scrollTo(0, 0);
    // }

    if (this.$route.params.fromHome !== 1) {
      this.hidden = true;
      this.datas = [];
      this.inputs = "";
      this.gotoSearch(1);
    }
  },
  components: { cGoodsList, cSort }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#search {
  .osll {
    min-height: 100vh;
    /*background: #FFF;*/
    margin-top: 3rem;
    box-sizing: border-box;
  }
  // 	@descendent wrapper {
  //     overflow: scroll;
  // }
  .page-loadmore-wrapper2 {
    height: 100vh;
    overflow: hidden;
  }
  .uou {
    width: 100%;
    position: fixed;
    z-index: 99;
    top: 0;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    width: 100%;
  }
  .mout {
    top: -2.25rem;
  }
  .el-input-group__append {
    .el-button--default {
      padding-top: 2px;
    }
  }
}

.search {
  overflow: hidden;
  background: #fff;
  border-bottom: 0.0625rem solid #f5f5f5;
  width: 100%;
  .el-input-group__append {
    background-color: none;
  }
  /*.el-button.el-button--default {*/
  /*float: left;*/
  /*width: 10%;*/
  /*border: none;*/
  /*padding-top: 1rem;*/
  /*}*/
  .mint-button.mint-button--default {
    float: left;
    width: 10%;
    border: none;
    padding-top: 0.4rem;
    box-shadow: none;
  }
  .el-input.el-input-group.el-input-group--append {
    float: left;
    width: 80%;

    margin-left: 2%;
    height: 2.8125rem;
  }
  .el-input-group__append .el-button.el-button--default {
    background: #f5f5f5;
    padding-top: 0.5625rem;
    line-height: 1rem;
    padding-right: 1.8125rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .el-input.el-input-group.el-input-group--append .el-input-group__append {
    background: #f5f5f5;
  }
  .el-col-1 {
    margin: 0.75rem 0rem;
    color: #666;
    font-size: 16px;
  }
  .searchBox {
    position: relative;
    font-size: 14px;
    display: inline-table;
    float: left;
    width: 80%;
    margin-left: 2%;
    height: 2.8125rem;
    input {
      vertical-align: middle;
      border: none;
      background: #f2f2f2 none;
      box-sizing: border-box;
      outline: 0;
      padding: 0.1875rem 0.625rem;
      height: 1.875rem;
      line-height: 1.875rem;
      margin-top: 0.5rem;
      color: #8c8c8c;
      font-size: 14px;
      width: 17.75rem;
      border-radius: 0.9375rem;
      z-index: 10;
    }
    .img-icon {
      border: none;
      color: #a9a9a9;
      display: table-cell;
      position: relative;
      border-radius: 0;
      height: 1.875rem;
      top: 0.0625rem;
      opacity: 2;
      left: -2.25rem;
      .img-icon-btn {
        position: absolute;
        z-index: 12;
        width: 1rem;
        height: 1rem;
        top: 50%;
        left: 50%;
        margin-left: -0.5rem;
        margin-top: -0.5rem;
        background: url("../../assets/images/search.png") no-repeat center
          center;
        background-size: 80% 80%;
      }
    }
  }
}
</style>

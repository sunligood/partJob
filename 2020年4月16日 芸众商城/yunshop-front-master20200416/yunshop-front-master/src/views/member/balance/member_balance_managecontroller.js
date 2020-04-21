import cTitle from "components/title";
import { Toast, MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      data: [],
      goods_length: 0
    };
  },
  methods: {
    initData() {
      $http.get("plugin.supplier.frontend.insurance.index").then(res => {
        console.log(res, "845545454");
        if (res.result == 1) {
          for (let i = 0;i < res.data.length;i++) {
            res.data[i].edit_active = false
          }
          this.data = res.data;
          this.goods_length = res.data.length;
        } else {
          // 判断权限
          if (res.data.url) {
            this.$notify(res.msg);
            window.location.href = res.data.url;
            return 0;
          }
          Toast(res.msg);
        }
      });
    },
    // 跳转到保单详情
    goTodetail(id) {
      this.$router.push(
        this.fun.getUrl("balance_manageDetail", {
          id: id
        })
      );
    },
    //跳转到表单添加
    goToAddbalance(){
      this.$router.push(
          this.fun.getUrl("add_balance_manage",{})
      );
    },
    moreEvent(index) {
      if (this.data[index].edit_active == false) {
        this.emptyEditActive()
        this.data[index].edit_active = true
      }else {
        this.emptyEditActive()
      }
    },
    emptyEditActive() {
      for (let i = 0;i < this.data.length;i++) {
        this.data[i].edit_active = false
      }
    },
    commodityDelete(index) {
      let that = this;
      this.emptyEditActive();
      this.$dialog.confirm({
        title: "提示",
        message: '此操作将永久删除该保单, 是否继续?',
      }).then(() => {
        // on confirm
        let json = {id: this.data[index].id}
        let urls = 'plugin.supplier.frontend.insurance.insurance-del'
        $http.post(urls, json).then(function (response) {
          if (response.result == 1) {
            that.$notify({
              background: '#f0f9eb',
              message: '保单删除成功',
              color: '#67c23a'
            })
            that.data.splice(index, 1)
            that.goods_length = Number(that.goods_length) - 1
          } else {
            // that.$message.error(response.msg)
            that.$notify(response.msg)
          }
        }, function (response) {})
      }).catch(() => {
        // on cancel
        this.$notify({
          background: '#edf2fc',
          message: '已取消删除',
          color: '#909399'
        })
      });
    },
    //商品编辑
    editJumpEvent(index) {
      this.$router.push(this.fun.getUrl("edit_balance_manage", {
        id: this.data[index].id
      }));
    },
  },
  activated() {
    this.initData();
  },
  components: {
    cTitle
  }
};

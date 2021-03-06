import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      start: false,
      address: "",
      is_default: false,
      mobile: "",
      code: "",
      imgCode: "",
      captcha: "",
      qr: ""
    };
  },
  activated() {
    this.inniData();
    this.getMobbile();
  },
  methods: {
    inniData() {
      this.start = false;
      this.address = "";
      this.is_default = false;
      this.mobile = "";
      this.code = "";
      this.imgCode = "";
      this.captcha = "";
      this.qr = "";
    },
    changeImg() {
      this.getMobbile();
    },
    afterRead(e) {
      let fd = new FormData();
      fd.append("file", e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      var That = this;
      this.uploadUrl = this.fun.getRealUrl("upload.uploadPic", {});
      axios
        .post(this.uploadUrl, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          this.qr = response.data.data.img_url;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getMobbile() {
      $http
        .get(
          "plugin.integral.Frontend.Modules.Integral.Controllers.integral-currency-withdraw-address.fillInAddress"
        )
        .then(response => {
          if (response.result == 1) {
            if (this.fun.isTextEmpty(response.data.mobile)) {
              Toast(response.msg);
              this.$router.push(this.fun.getUrl("editmobile"));
              return;
            } else {
              this.mobile = response.data.mobile;
              this.imgCode = this.fun.isTextEmpty(response.data.captcha)
                ? ""
                : response.data.captcha.img;
            }
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendCode() {
      let json = {
        mobile: this.mobile,
        captcha: this.captcha
      };
      if (
        this.fun.isTextEmpty(this.captcha) &&
        !this.fun.isTextEmpty(this.imgCode)
      ) {
        Toast("请输入图形验证码");
        return;
      }
      $http
        .get(
          "plugin.integral.Frontend.Modules.Integral.Controllers.integral-currency-withdraw-address.sendNewCode",
          json
        )
        .then(response => {
          if (response.result == 1) {
            Toast(response.msg);
            setTimeout(() => {
              this.start = true;
              this.$yddialog.loading.close();
            }, 1000);
            return;
          } else {
            this.getMobbile();
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    add() {
      let myreg = /^0x((?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,62}$)/;
      if (this.fun.isTextEmpty(this.code)) {
        Toast("请输入验证码");
        return;
      }
      if (!myreg.test(this.address)) {
        Toast("请输入以0x开头加字母和数字组合的地址");
        return;
      }
      if (this.fun.isTextEmpty(this.qr)) {
        Toast("请上传提币二维码");
        return;
      }
      let json = {
        address: this.address,
        is_default: this.is_default === true ? 1 : 0,
        code: this.code,
        mobile: this.mobile,
        qr: this.qr
      };
      $http
        .get(
          "plugin.integral.Frontend.Modules.Integral.Controllers.integral-currency-withdraw-address.store",
          json,
          "提交中"
        )
        .then(response => {
          if (response.result == 1) {
            Toast("提币地址添加成功");
            this.$router.go(-1);
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: { cTitle }
};

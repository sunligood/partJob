import cTitle from 'components/title'
import { MessageBox } from 'mint-ui'
import Vue from 'vue'

import { CountDown } from 'vue-ydui'

export default {
  data() {
    return {
      // 总共余额
      totalAmonut: '',
      // 总共参与人数
      totalNumber: '',
      // 总共参与会员
      totalMember: [],
      // 已打卡数量
      clockInNum: 0,
      // 未打卡数量
      notClockInNum: 0,
      // 第一名打卡会员
      clockFirstMember: {},
      clockFirstShow: false,
      // 手气最佳会员
      luckyMember: {},
      luckyMemberShow: false,
      // 连续打卡会员
      continueMember: {},
      continueMemberShow: false,
      // 信息说明
      message: '',

      // 倒计时
      cutDownTime: '',
      // 支付按钮控制
      forbidden: false,

      // 弹窗按钮控制
      actionSheetShow: false,

      actionSheetItems: [],

      btnStatus: '',

      amount: '1',

      clockin_title: '早起打卡',

      share_title: '',

      share_icon: '',

      share_desc: '',

      clock_begintime: '',

      clock_endtime: '',

      huanxun_form_wx: false,
      huanxun_form_action: '',
      huanxun_form_input: '',
      huanxun_input_name: ''
    }
  },
  methods: {
    // 获取今日支付数据
    getTodayPay() {
      $http
        .get('plugin.clock-in.api.clock-in.get-today-pay-data', {}, '')
        .then(response => {
          if (response.result === 1) {
            this.totalAmonut = response.data.today_pay_amount
            this.totalNumber = response.data.today_pay_num
            this.totalMember = response.data.today_pay_member
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 获取今日打卡数据
    getTodayClockOn() {
      // let that=this
      $http
        .get('plugin.clock-in.api.clock-in.get-today-clock-data', {})
        .then(response => {
          console.log(response)
          if (response.result == 1) {
            if (this.fun.isTextEmpty(response.data.clock_firat_member)) {
              this.clockFirstShow = false
            } else {
              this.clockFirstShow = true
              this.clockFirstMember = response.data.clock_firat_member
            }

            if (this.fun.isTextEmpty(response.data.reward_lucky_member)) {
              this.luckyMemberShow = false
            } else {
              this.luckyMemberShow = true
              this.luckyMember = response.data.reward_lucky_member
            }

            if (this.fun.isTextEmpty(response.data.clock_continuity_member)) {
              this.continueMemberShow = false
            } else {
              this.continueMemberShow = true
              this.continueMember = response.data.clock_continuity_member
            }

            this.clockInNum = response.data.clock_in_num
            this.notClockInNum = response.data.not_clock_in_num
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 获取当前支付打卡状态
    getCurrentPayStatus() {
      $http
        .get('plugin.clock-in.api.clock-in.get-member-pay-status', {}, '')
        .then(response => {
          console.log(response)
          if (response.result == 1) {
            this.amount = response.data.amount
            this.btnStatus = response.data.status
            this.initBtnView(response.data)
          } else {
            MessageBox.alert(response.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 获取倒计时
    getCutDownTime(data) {
      var currentTime = parseInt(data.current_time)
      var startTime = parseInt(data.start_time)
      var restTime = 0
      if (currentTime < startTime) {
        restTime = startTime - currentTime
      }
      return restTime
    },

    // 初始化btn状态
    initBtnView(data) {
      let that = this
      switch (data.status) {
        case -1:
          that.message = '支付' + that.amount + '元参与挑战'
          break
        case 0:
          that.message = '支付' + that.amount + '元参与挑战'
          break
        case 1:
          that.message = '倒计时'
          that.forbidden = true
          that.cutDownTime = this.getCutDownTime(data).toString()
          break
        case 2:
          that.message = '打卡'
          break
        case 3:
          that.message = '倒计时'
          that.forbidden = true
          that.cutDownTime = this.getCutDownTime(data).toString()
          break
        case 4:
          that.message = '倒计时'
          that.forbidden = true
          that.cutDownTime = this.getCutDownTime(data).toString()
          break
        default:
          break
      }
    },

    // * -1 前一天未支付->支付; 显示 支付
    // * 0 今日未支付->支付; 显示 支付
    // * 1 前一天已支付->倒计时; 显示 倒计时
    // * 2 前一天已支付->打卡进行中->等待打卡; 显示 打卡
    // * 3 前一天已支付->打卡完成 --- 继续支付
    // * 4 今日已支付->倒计时; 显示 倒计时
    // 回调处理
    clokinBtnCallBack(status) {
      let that = this
      switch (status) {
        case -1:
          that.actionSheetShow = true
          break
        case 0:
          that.actionSheetShow = true
          break
        case 1:
          break
        case 2:
          that.postClockIn()
          break
        case 3:
          that.actionSheetShow = true
          break
        case 4:
          break

        default:
          break
      }
    },

    // 打卡
    postClockIn() {
      var that = this
      $http
        .get('plugin.clock-in.api.clock-in.run-clock-in', {}, '')
        .then(response => {
          if (response.result == 1) {
            that.getCurrentPayStatus()
            that.getTodayPay()
            MessageBox.alert(response.msg)
          } else {
            MessageBox.alert(response.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 获取支付数据
    getPayData() {
      this.actionSheetItems = []
      $http
        .get('payment.pay-type', {})
        .then(response => {
          if (response.result == 1) {
            let btnData = response.data.buttons
            if (!this.fun.isTextEmpty(btnData) && btnData.length > 0) {
              for (let i = 0; i < btnData.length; i++) {
                let newItem = { }
                newItem.label = btnData[i].name
                newItem.callback = this.initPayCallBack(btnData[i])
                this.actionSheetItems.push(newItem)
              }
            }
          } else {
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 初始化支付回调
    initPayCallBack(item) {
      let callback = null
      let that = this
      switch (item.value) {
        case 1:
          callback = that.weChatPay
          break
        case 2:
          callback = that.aliPay
          break
        case 3:
          callback = that.balancePay
          break
        case 6:
          callback = that.newWeChatPay
          break
        case 12:
          callback = that.yunPay
          break
        case 7:
          callback = that.cloudAlipay
          break
        case 22:
          callback = that.hxWechatPay
          break
        case 28:
          callback = that.hJWechatPay
          break
        case 29:
          callback = that.hJaliPay
          break
        case 9:
          callback = that.appWeChatPay
          break
        // case 10:
        //   callback = that.appAliPay
          break
        default:
          break
      }
      return callback
    },

    // 支付
    payPost(type) {
      let that = this
      let json = { pay_method: type, amount: this.amount }
      console.log(type, '455454545454')

      let url = 'plugin.clock-in.api.clock-in-pay.run-clock-pay'; // "&client_type=2&app_type=wechat"
      if (window.isMiniprogram) {
        url += '&client_type=2&app_type=wechat'
      }
      $http
        .get(url, json, '支付中...')
        .then(response => {
          console.log('====', response)
          if (response.result == 1) {
            switch (type) {
              case 1: // 微信
                // MessageBox.alert('调微信支付方法。')
                wx.config(response.data.js)
                that.WXPay(response.data.config, response.data.redirect)
                break
              case 2: // 支付宝
                that.$router.push(
                  that.fun.getUrl('alipayClockin', {
                    status: '5',
                    url: response.data
                  })
                )
                break
              case 3: // 余额
                // MessageBox.alert(response.msg)
                // that.getTodayClockOn();//重新获取
                // that.getCurrentPayStatus()
                // break
                if (that.fun.isTextEmpty(response.data.redirect)) {
                  console.log(response.msg)
                  that.getTodayClockOn(); // 重新获取
                  that.getCurrentPayStatus()
                  MessageBox.alert(response.msg)
                  that.$router.push(that.fun.getUrl('home'))
                  break
                } else {
                  console.log(response.msg)
                  that.getTodayClockOn(); // 重新获取
                  that.getCurrentPayStatus()
                  window.location.href = response.data.redirect
                  MessageBox.alert(response.msg)
                  break
                }

              case 6: // 新版微信 link
                window.location.href = response.data
                break
              case 12: // 芸支付 微信
                that.newWXPay(response.data.config)
                break
              case 7: // 云收银支付宝
                that.$router.push(
                  that.fun.getUrl('alipayClockin', {
                    status: '5',
                    url: response.data
                  })
                )
                break
              case 22: // 环迅微信支付
                console.log('---------环迅微信支付-------')
                that.hxWxPay(response.data)
                break
              case 28: // 汇聚微信支付
                console.log('---------汇聚微信支付-------')
                that.hjWxPay(response.data)
                break
              case 29: // 汇聚支付宝支付
                console.log('---------汇聚支付宝支付-------')
                that.hjAlipay(response.data)
                break
              case 9://app微信支付
                YDB.SetWxpayInfo(
                  that.$store.state.temp.mailInfo.name,
                  '订单号：' + response.data.ordersn,
                  that.amount,
                  response.data.ordersn,
                  that.fun.getKeyByI()
                )
                  break
              case 10://app支付宝支付
                  // that.appAliPay(response.data);
                  break
              default:
                break
            }
          } else {
            MessageBox.alert(response.msg)
          }
        })
        .catch(error => {
          // MessageBox.alert(error)
          if (type != 28) {
            MessageBox.alert(error)
          }
        })
    },

    miniWxPay(payParams) {
      // alert(document.location.href)
      // console.log(""+
      var params =
      '?timestamp=' +
      payParams.timestamp +
      '&nonceStr=' +
      payParams.nonceStr +
      '&package=' +
      encodeURIComponent(payParams.package) +
      '&signType=' +
      payParams.signType +
      '&paySign=' +
      payParams.paySign
      // 定义path 与小程序的支付页面的路径相对应
      var path = '/pages/pay/orderPay' + params
      // 通过JSSDK的api使小程序跳转到指定的小程序页面
      wx.miniProgram.navigateTo({ url: path })
    },

    // 旧版微信支付参数
    WXPay(payParams, cbHref) {
      // alert(document.location.href)
      // console.log(""+payParams.timestamp)
      var that = this

      if (window.isMiniprogram) {
        that.miniWxPay(payParams)
        return
      }
      wx.chooseWXPay({
        appId: payParams.appId,
        timestamp: payParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payParams.nonceStr, // 支付签名随机串，不长于 32 位
        package: payParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payParams.paySign, // 支付签名
        success: function (res) {
          // 支付成功后的回调函数
          if (res.errMsg == 'chooseWXPay:ok') {
            // that.$router.go(-1)
            // MessageBox.alert('支付成功', '提示')
            // that.getCurrentPayStatus()
            // that.getTodayPay()
            if (that.fun.isTextEmpty(cbHref)) {
              that.getCurrentPayStatus()
              that.getTodayPay()
              that.$router.push(that.fun.getUrl('home'))
              MessageBox.alert('支付成功', '提示')
            } else {
              that.getCurrentPayStatus()
              that.getTodayPay()
              window.location.href = cbHref
              MessageBox.alert('支付成功', '提示')
            }
          } else {
            MessageBox.alert('支付失败', '提示')
          }
        },
        cancel: function (res) {
          // 支付取消
        },
        fail: function (res) {
          MessageBox.alert('支付失败，请返回重试', '提示')
        }
      })
    },

    // 新版微信支付参数
    newWXPay(payParams, cbHref) {
      var that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: payParams.appId, // 公众号名称，由商户传入
          timeStamp: payParams.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: payParams.nonceStr, // 随机串
          package: payParams.package,
          signType: payParams.signType, // 微信签名方式：
          paySign: payParams.paySign // 微信签名
        },

        function (res) {
          that.b = res
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            // MessageBox.alert('支付成功', '提示')
            // that.getCurrentPayStatus();//重新获取
            // that.getTodayPay()
            if (that.fun.isTextEmpty(cbHref)) {
              that.getCurrentPayStatus()
              that.getTodayPay()
              that.$router.push(that.fun.getUrl('home'))
              MessageBox.alert('支付成功', '提示')
            } else {
              that.getCurrentPayStatus()
              that.getTodayPay()
              window.location.href = cbHref
              MessageBox.alert('支付成功', '提示')
            }
          } else {
            MessageBox.alert('支付失败', '提示')
          }
        }
      )
    },

    hxWxPay(payParams) {
      var that = this

      that.huanxun_form_wx = true
      that.huanxun_input_name = 'wxPayReq'
      that.huanxun_form_action = payParams['url']
      that.huanxun_form_input = payParams['content']

      that.$nextTick(function () {
        document.getElementById('ipspaysubmit').submit()
      })
    },
    // 第三方汇聚微信支付
    hjWxPay(data) {
      console.log(data, '参数')

      let obj = JSON.parse(data.data.rc_Result)
      this.newWXPay(obj)
      console.log('第三方汇聚微信支付')
    },
    hjAlipay(data) {
      console.log(data, '支付宝参数')

      if (data.msg != '') {
        MessageBox.alert(data.msg, '提示')
      } else {
        window.href = data.rc_Result
      }
      console.log('第三方汇聚支付宝支付')
    },
    // 微信支付
    weChatPay() {
      this.payPost(1)
    },
    // 支付宝支付
    aliPay() {
      this.payPost(2)
    },
    // 余额支付
    balancePay() {
      this.payPost(3)
    },
    // 新版微信支付
    newWeChatPay() {
      this.payPost(6)
    },
    // 芸支付
    yunPay() {
      this.payPost(12)
    },
    //app微信支付
    appWeChatPay() {
      this.payPost(9)
    },
    //app支付宝支付
    appAliPay() {
      // this.payPost(10)
    },


    cloudAlipay() {
      this.payPost(7)
    },

    hxWechatPay() {
      this.payPost(22)
      console.log('-------data----', this.huanxun_form_input)
    },
    hJWechatPay() {
      this.payPost(28)
    },
    hJaliPay() {
      this.payPost(29)
    },

    // 倒计时回调
    cutDownCallBack() {
      console.log('cutdown callback')
      this.forbidden = false
      this.getTodayClockOn()
      this.getCurrentPayStatus()
    },

    // 获取早起打卡设置
    getClockin() {
      var that = this
      $http.get('plugin.clock-in.api.clock-in.get-set', {}).then(
        function (response) {
          if (response.result == 1) {
            that.clockin_title = response.data.plugin_name
            that.fun.setWXTitle(response.data.plugin_name)
            // 分享数据
            that.share_title = response.data.share.share_title
            that.share_icon = response.data.share.share_icon
            that.share_desc = response.data.share.share_desc

            that.clock_begintime = response.data.clock_time.starttime

            that.clock_endtime = response.data.clock_time.endtime

            that.initShare()
          } else {
          }
        },
        function (response) {}
      )
    },

    // 微信分享
    initShare() {
      let that = this
      console.log(document.location.href)
      let _url = document.location.href
      let json = { url: _url }
      $http.post('member.member.wxJsSdkConfig', json).then(
        function (response) {
          console.log(response)
          if (response.result == 1) {
            // that.cservice = response.data.shop.cservice
            // that.initCservice(response.data.shop.cservice);//重新赋值
            if (response.data.config) {
              that.share(response.data);
            }
          } else {
          }
        },
        function (response) {
          console.log(response)
        }
      )
    },

    share(data) {
      let that = this
      wx.config(data.config)
      wx.ready(function () {
        //   let _title = (that.fun.isTextEmpty()) ? that.goodsInfo.title : that.goodsInfo.has_one_share.share_title

        let _title = that.share_title

        // let _link = document.location.href + "&mid=" + data.info.uid
        let _link = document.location.href
        _link = that.fun.isMid(_link, data.info.uid)

        // let _imgUrl = (that.fun.isTextEmpty()) ? that.goodsInfo.thumb : that.goodsInfo.has_one_share.share_thumb
        // let _desc = (that.fun.isTextEmpty()) ? data.shop.name : that.goodsInfo.has_one_share.share_desc

        let _imgUrl = that.share_icon
        let _desc = that.share_desc

        wx.showOptionMenu()

        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function () {
            Toast('分享成功')
          },
          cancel: function () {
            Toast('取消分享')
          }
        })

        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            Toast('分享成功')
          },
          cancel: function () {
            Toast('取消分享')
          }
        })

        //   if(that.fun.getWechatVersion()){
        //     wx.updateTimelineShareData({
        //         title: _title, // 分享标题
        //         link: _link, // 分享链接
        //         imgUrl: _imgUrl, // 分享图标
        //         success: function () {
        //           //Toast("分享成功")
        //         },
        //         // cancel: function () {
        //         //   Toast("取消分享")
        //         // }
        //       })

        //       wx.updateAppMessageShareData({
        //         title: _title, // 分享标题
        //         desc: _desc, // 分享描述
        //         link: _link, // 分享链接
        //         imgUrl: _imgUrl, // 分享图标
        //         type: 'link', // 分享类型,music、video或link，不填默认为link
        //         dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        //         success: function () {
        //           //Toast("分享成功")
        //         },
        //         // cancel: function () {
        //         //   Toast("取消分享")
        //         // }
        //       })
        //   }else{
        //     wx.onMenuShareTimeline({
        //         title: _title, // 分享标题
        //         link: _link, // 分享链接
        //         imgUrl: _imgUrl, // 分享图标
        //         success: function () {
        //             Toast("分享成功")
        //         },
        //         cancel: function () {
        //             Toast("取消分享")
        //         }
        //     })

      //       wx.onMenuShareAppMessage({
      //         title: _title, // 分享标题
      //         desc: _desc, // 分享描述
      //         link: _link, // 分享链接
      //         imgUrl: _imgUrl, // 分享图标
      //         type: 'link', // 分享类型,music、video或link，不填默认为link
      //         dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      //         success: function () {
      //             Toast("分享成功")
      //         },
      //         cancel: function () {
      //             Toast("取消分享")
      //         }
      //     })
      //   }
      })
    }
  },
  activated() {},

  mounted() {
    this.share_title = ''
    this.share_icon = ''
    this.share_desc = ''
    ;(this.clock_begintime = ''), (this.clock_endtime = ''), this.getTodayPay()
    this.getTodayClockOn()
    this.getCurrentPayStatus()
    this.getPayData()
    this.getClockin()
  },
  components: { cTitle}
}

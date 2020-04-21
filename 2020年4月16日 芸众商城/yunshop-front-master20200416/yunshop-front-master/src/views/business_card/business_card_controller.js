import cTitle from "components/title";
import {Toast, MessageBox} from "mint-ui";
export default {
	data() {
		return {
			toolbar: false,
			AllData:{},
			show1: false,
			award: null,
			voice: '',
			playAudio: false,
			custom_name: {
				love_name: "",
				point_name: "",
			},
			card_id: "",
			visit_id: "",
			cardData: {
				picture: []
			},
			areas: "",
			clickStatus: {},
			nums: {
				visit_statistics: {}
			},
			goods: [],
			cardType: "",
			shop_owner: {},

			level_name: "",
			store_name: "",
			active: 0,
			visit: 0,
			collection: 0,
			reliable: 0,

			//供应商
			supplier: null,

			// 门店
			good_page: 1,
			store_good: [],
			coupon_list: [],

			// 招商员
			cardUrl: "",
			cardList_page: 1,
			cardList: [],
			showMore: true,
			member: {},

			income_name_text: "",
			// 导航盒子的高度
			isintro:false,
			// 我的贴子
			newClassification:{},
			isVideo:{},
			isArticle:{},
			area_name:'',
			//导航
			istapBtn:'intro',
			tapTitle:'intro',
			//开关
			is_trick :'',
			is_video :'',
			is_article :'',
			is_street :'',
		};
	},
	activated() {
		this.card_id = this.fun.getKey("mark_id");
		this.playAudio = false;
		this.initData();
		this.getCardDate();
		this.customizeIncome();
	},
	mounted() {
		this.visit_id = localStorage.getItem('uid');
	},
	methods: {
		toxiangq(kid,name){
			console.log(kid,name)
			if(name == 'post'){
				this.$router.push(
					this.fun.getUrl("microCommentDetails", {
						stickId: kid
					})
				);
			}else if(name == 'video'){
				// let page = this.videoList.findIndex((value, index, arr) => {
				// 	return value.id === item.id;
				// });
				//页数
				// page = Math.ceil((page + 1) / 15);
				this.$router.push(
					this.fun.getUrl("VideoDetail", {}, { vid: kid.id, page: 1 })
				);
			}else if(name == 'text'){
				this.$router.push(this.fun.getUrl("articleContent", { id: kid.id }));
			}
		},
		tabclick(e){
			console.log(e)
			this.tapTitle = e
		},
		tabChange(){
			console.log(this.istapBtn)
			this.isintro = false;
			// if(this.istapBtn == 'intro'){
			// 	console.log(this.cardData.picture)
			// 	if(this.cardData.picture.length<=0){
			// 		this.isintro = true;
			// 	}
			// }
			if(this.istapBtn == 'postMy'){
				console.log(this.newClassification)
				if(this.newClassification.length < 3){
					this.isintro = true;
				}
			}
			if(this.istapBtn == 'video'){
				console.log(this.isVideo)
				if(this.isVideo.length < 3){
					this.isintro = true;
				}
			}
			if(this.istapBtn == 'text'){
				if(this.isArticle.length < 3){
					this.isintro = true;
				}
			}
		},
		loadNext(str){
			console.log(str)
			if(str == 'intro'){
				this.isintro = true
			}
		},
		showToolbar() {
			this.toolbar = !this.toolbar;
		},
    end(blob){
	    const that = this;
      this.$refs.audios.src=URL.createObjectURL(blob);
	    this.$refs.audios.onended=function(){
		    that.playAudio = false;
	    };
    },
		playMp3(src){
			const that = this;
			this.$refs.audios.src = src;
			this.$refs.audios.onended=function(){
				that.playAudio = false;
			};
		},
    playAmr(){
    	if (this.$refs.audios.paused){
    		this.playAudio = true;
        this.$refs.audios.play();
	    } else {
		    this.playAudio = false;
        this.$refs.audios.pause();
	    }
    },
    initWithUrl(url) {
      if (this._isInit || this._isInitRecorder) {
        throw new Error('AMR has been initialized. For a new AMR, please generate a new BenzAMRRecorder().');
      }
      const p = new Promise((resolve, reject) => {
        fetch(url, {
          method: 'GET',
          responseType: 'blob',
          headers: {'Content-Type': 'application/octet-stream'},
          credentials: 'include'
        })
          .then((response) => {
            if (response.ok) {
              response.blob().then(function(blob) {
                console.log(blob);
                resolve(blob);
              });
            }
          })
          .catch((err) => {
            reject(err);
          })

      });
      return p.then(blob => {
        return blob;
      });
    },
    loadDemoBtn(voice){
      const that = this;
      // http://localhost:8081/addons/yun_shop/static/app/mario.amr
      // https://dev1.yunzshop.com/addons/yun_shop/storage/app/public/business_card/3f91e0ce6866d86639e81aab8f4951a2_5.amr
      that.initWithUrl(voice).then((data)=> {
        Recorder.amr2wav(data,function(blob){
          that.end(blob);
          console.log("已转码成wav播放");
        },function(msg){
          console.log("转码成wav失败："+msg);
        });
      });
    },
		initData() {
			this.cardData = {};
			this.show1 = false;
			// this.post_page = 1;
			this.active = 0;
			this.good_page = 1;
			this.store_good = [];
			this.cardUrl = "";
			this.cardList_page = 1;
			this.cardList = [];
			this.showMore = true;
		},
		toCardVisit() {
			this.triggerAction("3");
			this.$router.push(
					this.fun.getUrl("CardVisit", {card_id: this.card_id})
			);
		},
		toPage(url) {
			if(url == 'CardCode'){
				this.$router.push(this.fun.getUrl(url,{card_id: this.card_id}));
			}else{
				this.$router.push(this.fun.getUrl(url));
			}
		},
		toGood(item) {
			this.$router.push(this.fun.getUrl("goods", {id: item.id}, {
				mark: 'card',
				mark_id: this.fun.getKey('mark_id')
			}));
		},
		toShop(id, str) {
			if (str === 'hotel') {
				this.$router.push(this.fun.getUrl("HotelHome", {id: id, fromHome: 1}));
			} else if (str === 'store') {
				this.$router.push(this.fun.getUrl("HomeSeller", {store_id: id}));
			} else if (str === 'supplier') {
				this.$router.push(this.fun.getUrl("SupplierShop", {id: id, fromHome: 1}));
			}
		},
		toBuy(id) {
			this.$router.push(this.fun.getUrl("cashier_pay", {store_id: id}));
		},
		getGoods() {
			let url = ""; // 供应商
			if (this.cardType === "supplier") {
				url = "plugin.business-card.frontend.controllers.card.card.getSupplierGoods"; // 供应商
			} else if (this.cardType === "shop_owner" || this.cardType === "clerk") {
				url = "plugin.business-card.frontend.controllers.card.card.getStoreGoods" //门店
			} else {
				return;
			}
			$http
					.get(url, {page: this.good_page, card_id: this.card_id}," ")
					.then(
							response => {
								if (response.result === 1) {
									this.store_good = this.store_good.concat(response.data.data);
									response.data.current_page >= response.data.last_page ? this.showMore = false : this.showMore = true;
								} else {
									Toast(response.msg);
								}
							},
							function (response) {
								console.log(response);
							}
					)
					.catch(error => {
						console.log(error);
					});
		},
		getList() {
			$http
					.get(this.cardUrl, {page: this.cardList_page, card_id:this.card_id}," ")
					.then(
							response => {
								if (response.result === 1) {
									this.cardList = this.cardList.concat(response.data.data);
									response.data.current_page >= response.data.last_page ? this.showMore = false : this.showMore = true;
								} else {
									Toast(response.msg);
								}
							},
							function (response) {
								console.log(response);
							}
					)
					.catch(error => {
						console.log(error);
					});
		},
		loadMore(str) {
			if (str === 'good') {
				this.good_page++;
				this.getGoods();
			} else if (str === 'list') {
				this.cardList_page++;
				this.getList();
			}
		},
		chooseTab(index,title) {
			this.nowTab = index;
			if (this.cardType === "staff") {
				//招商员
				if (title === '供应商') {
					this.cardUrl =
							"plugin.business-card.frontend.controllers.card.card.getStaffSupplier";
				} else if (title === '门店') {
					this.cardUrl =
							"plugin.business-card.frontend.controllers.card.card.getStaffStore";
				} else if (title === '酒店') {
					this.cardUrl =
							"plugin.business-card.frontend.controllers.card.card.getStaffHotel";
				}
			} else if (this.cardType === "center") {
				//招商中心
				if (title === '供应商') {
					this.cardUrl =
							"plugin.business-card.frontend.controllers.card.card.getCenterSupplier";
				} else if (title === '门店') {
					this.cardUrl =
							"plugin.business-card.frontend.controllers.card.card.getCenterStore";
				} else if (title === '酒店') {
					this.cardUrl =
							"plugin.business-card.frontend.controllers.card.card.getCenterHotel";
				}
			} else {
				return;
			}
			this.cardList_page = 1;
			this.showMore = true;
			this.cardList = [];
			this.getList();
		},
		getCardDate() {
			$http.get(
							"plugin.business-card.frontend.controllers.card.card.sendCardByRoleId",
							{
								card_id: this.card_id,
								mark:'card',
								mark_id: this.fun.getKey('mark_id'),
							}," "
					)
					.then(
							response => {
								if (response.result === 1) {
									this.AllData = response.data;
									this.cardData = response.data.card;
									this.award = response.data.award;
									this.member = response.data.result.member;
									this.voice = this.cardData.voice;
									this.newClassification = response.data.tricks;
									this.isVideo = response.data.videos;
									this.isArticle = response.data.articles;
									// 开关
									this.is_trick = response.data.is_trick;
									this.is_video = response.data.is_video;
									this.is_article = response.data.is_article;
									this.is_street = response.data.is_street;
									// this.
									if(this.AllData.banner){
										this.bacImage = {backgroundImage: "url("+this.AllData.banner+")"}
									}
									if(this.fun.isWeiXin() && this.voice){
										this.voice.endsWith(".mp3") ? this.playMp3(this.voice) : this.loadDemoBtn(this.voice);
									}
									if(this.cardData.picture.length<=0){
										this.isintro = true;
									}
									if(!this.member.member && this.member.name){
										this.level_name = this.member.name.level_name;
									} else {
										this.level_name = this.cardData.level_name;
									}
									if (this.award) {
										this.show1 = true;
										this.custom_name = response.data.result.member.custom_name;
									}
									if (response.data.is_street === '1' && this.cardData.areas[0]) {
										this.areas =
												this.cardData.areas[0] +
												this.cardData.areas[1] +
												this.cardData.areas[2] +
												this.cardData.areas[3] +
												this.cardData.address;
									} else if (this.cardData.areas[0]) {
										this.areas =
												this.cardData.areas[0] +
												this.cardData.areas[1] +
												this.cardData.areas[2] +
												this.cardData.address;
									}
									this.visit= response.data.result.member.achievement.visit_statistics.visit;
									this.collection = response.data.card.card_statistics.collection;
									if(this.collection >= 10000){
										this.collection = (this.collection/10000).toFixed(1) +`w`
									}
									this.reliable = response.data.card.card_statistics.reliable;
									this.setData(response.data.result.member);
									if(this.member.is_supplier == 1){
										this.chooseTab(0,'供应商');
									}else if(this.member.is_store == 1){
										this.chooseTab(1,'门店');
									}else if(this.member.is_hotel == 1){
										this.chooseTab(2,'酒店');
									}

									this.getGoods();
									this.visit_id = response.data.result.member.self;
									this.clickStatus = response.data.result.member.status;
									this.nums = response.data.result.member.achievement;
									this.goods = response.data.result.member.goods;
									this.initShare();
								} else {
									this.$router.push(this.fun.getUrl('home'));
									Toast(response.msg);
								}
							},
							function (response) {
								console.log(response);
							}
					)
					.catch(error => {
						console.log(error);
					});
		},
		setData(data) {
			if (data.member) {
				this.cardType = "member";
			} else if (data.team_dividend) {
				this.cardType = "team_dividend";
			} else if (data.commission) {
				this.cardType = "commission";
			} else if (data.staff) {
				this.cardType = "staff";
			} else if (data.center) {
				this.cardType = "center";
			} else if (data.area_dividend) {
				this.cardType = "area_dividend";
				if(data.name){
					this.level_name = data.name.level_name;
				} else {
					this.level_name = data.area_dividend.level_name;
				}
			} else if (data.supplier) {
				this.cardType = "supplier";
				this.supplier = data.supplier;
				if(data.name){
					this.level_name = data.name.level_name;
				} else {
					this.level_name = data.supplier.store_name;
				}
			} else if (data.shop_owner) {
				this.cardType = "shop_owner";
				this.store_name = data.shop_owner.store_name;
				this.shop_owner = data.shop_owner;
				this.coupon_list = data.coupon;
			} else if (data.clerk) {
				this.cardType = "clerk";
				this.store_name = data.clerk.store_name;
				this.coupon_list = data.coupon;
			}
		},
		selectedcoupon(item, index) {
			if (item.received === 3) {
				return;
			}
			//领取
			var that = this;
			$http.get('plugin.store-cashier.frontend.store.couponGet.index', {coupon_id: item.id}, '正在抢此优惠券').then(function (response) {
				if (response.result === 1) {
					let temp = response.data;
					that.$set(that.coupon_list, index, temp);
					MessageBox.alert("领取成功");
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				// error callback
			});
		},
		changeLike(type) {
			$http
					.get(
							"plugin.business-card.frontend.controllers.action.card-action.index",
							{card_id: this.card_id, card_type: type},
							" "
					)
					.then(
							response => {
								if (response.result === 1) {
									if(type === '1'){
										this.clickStatus.collected = response.data;
									}else{
										this.clickStatus.reliabled = response.data;
									}
									this.getCardDate();
								} else {
									Toast(response.msg);
								}
							},
							function (response) {
								console.log(response);
							}
					)
					.catch(error => {
						console.log(error);
					});
		},
		triggerAction(type) {
			$http
					.get(
							"plugin.business-card.frontend.controllers.action.card-pre-action.index",
							{card_id: this.card_id, card_type: type}
					)
					.then(
							response => {
								if (response.result === 1) {
								} else {
									Toast(response.msg);
								}
							},
							function (response) {
								console.log(response);
							}
					)
					.catch(error => {
						console.log(error);
					});
		},
		//复制邀请码
		onCopy: function (e) {
			this.triggerAction("4");
			Toast({
				message: "复制成功",
				position: "bottom",
				duration: 1000
			});
		},
		onError: function (e) {
			Toast({
				message: "复制失败",
				position: "bottom",
				duration: 1000
			});
		},
		//初始化分享设置
		initShare() {
			let json = {  url: this.fun.isIosOrAndroid() === "android"
          ? window.location.href
          : window.initUrl , mid: this.fun.getKeyByMid() };
			$http
					.post("member.member.wxJsSdkConfig", json)
					.then(
							response => {
								if (response.result === 1) {
									this.share(response.data);
								} else {
								}
							},
							function(response) {
								console.log(response);
							}
					)
					.catch(error => {
						console.log(error);
					});
		},
		//组装分享设置
		share(data) {
			let that = this;
			// alert(that.AllData.share_url);
			wx.config(data.config);
			wx.ready(function() {
				let _title = `您好，这是【${that.cardData.card_name || ''}】的名片，望惠存`;
				let _link = that.AllData.share_url;
				// _link = that.fun.isMid(_link, that.fun.getKeyByMid());

				let _imgUrl = that.cardData.card_avatar;
				let _desc = that.fun.isTextEmpty(that.cardData.introduction)
						? "什么也没写~"
						: that.cardData.introduction;
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

			});
		},
		//自定义提现收入语言
		customizeIncome(){
			let mailLanguage = this.fun.initMailLanguage()
			//自定义收入字段
			this.income_name_text = mailLanguage.income.income_name;
		}
	},
	components: {cTitle}
};

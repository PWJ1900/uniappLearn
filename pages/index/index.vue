<template>
	<view class="mainView" style="background-color:#F5F5F5">
		<!-- <HeaderUse/> -->
		<!-- <map @click="dianji" style="width: 200px; height: 150px;"></map> -->
		<view style="width: 100%;">
			<v-tabs :value="current" :tabs="tabs" @change="changeTab" bgColor="#00a6ac" :fixed="true" color="#FFFFFF"
				lineColor="rgba(153, 255, 102, 1) " :scroll='true' :lineScale="1" :pills="true" activeColor="#FFFFFF"
				paddingItem="57rpx" :listUse="[12,23,45,2]"></v-tabs>
		</view>
		<view style="margin-top: 5px;">
			<map  v-if="showMap" style="width: 100%; height: 1000rpx;" :latitude="latitude" :longitude="longitude" :markers="covers">
			</map>
			<view class="box" v-for="(item,index) in getAllForm" :key="index" v-if="!showMap">
				<view class="box-item">
					<text style="font-size: small;">
						{{item.fromAddress}} → {{item.arriveToAddress}}<text
							style="color: #808080;font-size: smaller;">（约{{item.distance}}）</text><br>
						{{item.carNum}} {{item.date}}{{item.timeAll}}<br>
						{{item.height}} I {{item.type}} I {{item.weight}}<br></text>
					<view class="box-littleWindow">
						<view>
							<button type="default" class="headerIcon"></button>
						</view>
						<view>
							<text style="margin-left: 10px;">{{item.name}}</text><br>
							<button size="mini" class="littleButton">{{item.goodWords}}</button>
							<button size="mini" class="littleButton">{{item.badWords}}</button>
						</view>
					</view>
				</view>
				<view class="box-item2">
					<view style="margin-left: 12px;">{{item.activeTime}}<br></view>
					<button @click=" " class="phoneButton"></button>
					<button @click="jumpTo()" class="buttonUse2">报表录入</button>

				</view>
			</view>
		</view>
		<button @click="useG" class="info position-sticky fixed-bottom">在途定位</button>
	</view>

	</view>
</template>
<script>
	import HeaderUse from "@/components/headerUse/header.vue"
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 0,
				longitude: 0,
				showMap:false,
				covers: [{
					latitude: 0,
					longitude: 0,
					iconPath: '../../../static/location.png'
				}],
				current: 0,
				scrolltop: 0,
				getNum: Number,
				tabs: [{
					name: "全部"
				}, {
					name: "未到达"
				}, {
					name: "运输中"
				}, {
					name: "已到达"
				}],
				getAllForm: [{ //	这里设置的一个getAllForm[{}]类型后面初始化页面时可以绑定后台数据
						fromAddress: "常州 天宇",
						arriveToAddress: "宿迁 泗洪",
						distance: "395km",
						carNum: "苏LUS837",
						date: "2021-3-31",
						timeAll: "全天",
						weight: "8吨",
						type: "高地板",
						height: "17.5米/13.7米",
						name: "丁超",
						goodWords: "好评0次",
						badWords: "举报0次",
						activeTime: "1分钟前",
					},
					{ //	这里设置的一个getAllForm[{}]类型后面初始化页面时可以绑定后台数据
						fromAddress: "常州 天宇",
						arriveToAddress: "宿迁 泗洪",
						distance: "395km",
						carNum: "苏LUS837",
						date: "2021-3-31",
						timeAll: "全天",
						weight: "8吨",
						type: "高地板",
						height: "17.5米/13.7米",
						name: "丁超",
						goodWords: "好评0次",
						badWords: "举报0次",
						activeTime: "1分钟前",
					},
					{ //	这里设置的一个getAllForm[{}]类型后面初始化页面时可以绑定后台数据
						fromAddress: "常州 天宇",
						arriveToAddress: "宿迁 泗洪",
						distance: "395km",
						carNum: "苏LUS837",
						date: "2021-3-31",
						timeAll: "全天",
						weight: "8吨",
						type: "高地板",
						height: "17.5米/13.7米",
						name: "丁超",
						goodWords: "好评0次",
						badWords: "举报0次",
						activeTime: "1分钟前",
					},
					{ //	这里设置的一个getAllForm[{}]类型后面初始化页面时可以绑定后台数据
						fromAddress: "常州 天宇",
						arriveToAddress: "宿迁 泗洪",
						distance: "395km",
						carNum: "苏LUS837",
						date: "2021-3-31",
						timeAll: "全天",
						weight: "8吨",
						type: "高地板",
						height: "17.5米/13.7米",
						name: "丁超",
						goodWords: "好评0次",
						badWords: "举报0次",
						activeTime: "1分钟前",
					},
					{ //	这里设置的一个getAllForm[{}]类型后面初始化页面时可以绑定后台数据
						fromAddress: "常州 天宇",
						arriveToAddress: "宿迁 泗洪",
						distance: "395km",
						carNum: "苏LUS837",
						date: "2021-3-31",
						timeAll: "全天",
						weight: "8吨",
						type: "高地板",
						height: "17.5米/13.7米",
						name: "王五",
						goodWords: "好评0次",
						badWords: "举报0次",
						activeTime: "1分钟前"
					},
					{ //	这里设置的一个getAllForm[{}]类型后面初始化页面时可以绑定后台数据
						fromAddress: "常州 天宇",
						arriveToAddress: "宿迁 泗洪",
						distance: "95km",
						carNum: "苏AKS980",
						date: "2021-3-30",
						timeAll: "全天",
						weight: "80吨",
						type: "短板",
						height: "17米/13米",
						name: "李四",
						goodWords: "好评1次",
						badWords: "举报2次",
						activeTime: "5分钟前"
					},
					{ //	这里设置的一个getAllForm[{}]类型后面初始化页面时可以绑定后台数据
						fromAddress: "常州 天宇",
						arriveToAddress: "宿迁 泗洪",
						distance: "395km",
						carNum: "苏LUS837",
						date: "2021-3-31",
						timeAll: "全天",
						weight: "8吨",
						type: "高地板",
						height: "17.5米/13.7米",
						name: "张三",
						goodWords: "好评0次",
						badWords: "举报0次",
						activeTime: "1分钟前"
					}
				]

			}
		},
		onLoad() {
			uni.setTabBarBadge({
				index: 0,
				text: "1"
			})


		},
		components: {
			HeaderUse
		},
		methods: {
			 useG() {
				// uni.navigateTo({
				// 	url:"/pages/bblr/indexUse"
				// })
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (res)=>{
						console.log('当前位置的经度：' + res.longitude);
						this.latitude = res.latitude;
						this.longitude = res.longitude;
					    console.log(this.latitude)

					}
				})
				console.log(this.latitude)
				this.covers[0].latitude = this.latitude
				this.covers[0].longitude = this.longitude
				this.$nextTick(function(){
					this.showMap = !this.showMap
				})
				
				
			},
			changeTab(index) {
				this.current = index
				console.log('当前选中的项：' + index)
			},
			jumpTo(index) {
				uni.navigateTo({
					url: "/pages/bblr/indexUse"
				})

			}
			// ,
			// dianji() {
			// 	uni.chooseLocation({
			// 		success: (res) => {
			// 			this.form.place = res.name;
			// 			console.log('位置名称：' + res.name);
			// 			console.log('详细地址：' + res.address);
			// 			console.log('纬度：' + res.latitude);
			// 			console.log('经度：' + res.longitude);
			// 		}
			// 	})
			// }

		}
	}
</script>
<style>
	page {
		background-color: rgba(249, 249, 249, 1);
	}
</style>
<style>
	.box {
		background-color: #F0F0F0;
		margin: 0 0 12px;
		display: flex;



	}

	.box-item {
		width: 70%;
		height: 124px;
		/* line-height: 200px; */
		background-color: #FFFFFF;
		padding-left: 12px;
		/* padding-bottom: 0rpx; */

	}

	.box-item2 {
		width: 30%;
		height: 124px;
		/* line-height: 200px; */
		background-color: #FFFFFF;

	}

	.box-littleWindow {
		display: flex;
		/* margin-top: 3%; */
		/* margin-bottom: 1000rpx !important; */

	}

	.buttonUse {
		position: absolute;
		/* margin-bottom: 0; */
		width: 100px;
		height: 30px;
		margin-left: 10rpx;
		margin-top: 10rpx;
		bottom: 4%;
		font-size: small;
		background-color: rgba(49, 139, 74, 1);
		color: #FFFAFA;
	}

	.buttonUse2 {
		width: 80px;
		height: 30px;
		margin-left: 0;
		margin-top: 35px;
		background-color: rgba(49, 139, 74, 1);
		font-size: small;
		color: #FFFAFA;

	}

	.phoneButton {
		width: 30px;
		height: 30px;
		margin-left: 20px;
		margin-bottom: 12px;
		background-image: url(../../static/DE35DD80D8D46E56E74F9A41C81BC0CB.png);
		background-size: 100% 100%;
		background-color: #FFFFFF;
		font-size: small;
		color: #FFFAFA;
	}

	.phoneButton::after {
		border: none;
	}

	.littleButton {
		margin-left: 10px;
		background-color: #d71345;
		/* margin-top: 16%; */
		/* p-bottom: 0px; */
		color: #FFFFFF;

	}

	.headerIcon {
		width: 30px;
		height: 30px;
		margin-left: 2px;
		margin-top: 15px;
		background-size: 100% 100%;
		background-image: url(../../static/16AA280FE737403A0CB21E11BE83DC4D.png);
	}

	.headerIcon::after {
		border: none;
	}

	.search {
		width: 30px;
		height: 30px;
		margin-left: 2px;
		margin-top: 15px;
		background-size: 100% 100%;
		background-image: url(../../static/16AA280FE737403A0CB21E11BE83DC4D.png);

	}

	.position-sticky {
		position: -webkit-sticky !important;
		position: sticky !important;
	}

	.fixed-bottom {
		position: fixed;
		width: 80px;
		height: 30px;
		margin-left: 0;
		background-color: rgba(49, 139, 74, 1);
		font-size: small;
		color: #FFFAFA;
		right: 0;
		bottom: calc(var(--window-bottom) + 3px);
		left: 0;
		z-index: 1030;

		/* margin-bottom: 100px; */
	}
</style>

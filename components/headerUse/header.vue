<template>
	<view style="height:140rpx;">
		<view class="top">
			<view style="width: 82%;height: 140rpx;">
				<!-- <custom-tab-bar   direction="horizontal" :show-icon="false" :selected="selected" @onTabItemTap="onTabItemTap" style="background-color:rgba(49, 139, 74, 1);width: 200px;"/> -->
				<v-tabs :value="current" :tabs="tabs" @change="changeTab" bgColor="rgba(49, 139, 74, 1)" color="#FFFFFF"
					lineColor="rgba(153, 255, 102, 1) " :scroll='true' :lineScale="1" activeColor="#FFFFFF"
					paddingItem="20px" :listUse="[12,23,45]"></v-tabs>
				<v-tabs :value="current2" :tabs="tabs2" @change="changeTab2" bgColor="rgba(49, 139, 74, 1)"
					color="#FFFFFF" lineColor="rgba(153, 255, 102, 1) " :scroll='true' :lineScale="1"
					activeColor="#FFFFFF" paddingItem="20px" :listUse="[10,23,45]"></v-tabs>
			</view>
			<view style="background-color: rgba(49, 139, 74, 1);width: 18%; padding-left: 20px; padding-top: 15px;">
				<uni-icons type="search" size="30" color="#FFFFFF" @click="getBigSearch"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		props: {
			qshdHistorySearch: {
				type: Boolean,
				default: false

			},

		},
		onLoad() {
			console.log(this.$store)
		},
		data() {

			return {

				// current:0,
				// current2:-1
				// tabs: ['寻找车量', '成交订单', '申请资金'],
				// tabs2: ['支付资金', '签收回单', '合同冲账'],
			}
		},
		computed: {
			...mapGetters(['current']),
			...mapGetters(['current2']),
			...mapState(['tabs']),
			...mapState(['searchDefine']),
			...mapState(['tabs2']),

		},
		methods: {
			getBigSearch() {
				console.log(this.searchDefine)
				this.changeSearch(true)
				// if (this.current2 == 1) {
				// 	this.$emit("useQshdSearch", this.searchDefine)
				// }else{
				// 	this.$emit("useQshdSearch", this.searchDefine)
				// }
			},
			useit() {
				uni.navigateTo({
					url: "../index/index"
				})
			},
			...mapMutations(['changeTab', 'changeTab2', 'changeSearch']),
			// changeTab(index) {
			// 	 current2 = -1
			//      console.log('当前选中的项：' + index)
			//    },
			// changeTab2(index){
			// 			current = -1
			// 			console.log('当前选中的项：' + index)
			// }

		}
	}
</script>

<style>
	.top {
		position: fixed;
		width: 100%;
		/* #ifdef H5 */
		top: 0px;
		/* #endif */
		/* #ifndef H5 */
		/* #endif */
		z-index: 999;
		flex: 1;
		overflow: hidden;
		background-color: #ffffff;
		display: flex;
	}
</style>

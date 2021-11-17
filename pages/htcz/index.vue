<template>
	<view style="height: 10%;">
		<!-- <HeaderUse/> -->
		<!-- 合同冲账 -->
		<uni-row>
			<uni-col :span="8">
				<uni-easyinput id="use" v-model="carOrgoodsNum" placeholder="输入合同号、车号" >
				</uni-easyinput>
			</uni-col>
			<uni-col :span="12">
				<!-- 选择日期 -->
				<view class="example-body">
					<uni-datetime-picker v-model="datetimerange" :vlaue="single" type="date" />
				</view>
			</uni-col>
			<uni-col :span="4">
				<button
					style="padding: 0; height: 60rpx; font-size: smaller;background-color: rgba(49, 139, 74, 1);color: #FFFAFA;"
					@click="searchUse">搜索</button>
			</uni-col>
		</uni-row>
		<uni-tag text="标签">你好</uni-tag>
		<uni-tag text="标签" type="error" :circle="true">你号</uni-tag>
		<uni-tag text="标签" @click="bindClick">拟好</uni-tag>
		<uni-card style="margin-top: 10rpx;">
			<uni-table @selection-change="change" border stripe emptyText="暂无更多数据"
				style="max-height:750rpx; margin-top: 2%;" v-if="showTable1" :key="1">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th>序号</uni-th>
					<uni-th align="center" v-for="i,k in header" width="10" :key="k">{{i}}</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="j,nu in listSecond" :key="nu">
					<uni-td>{{nu+1}}</uni-td>
					<uni-td v-for="w,index in listSecond[0]" width="40" style="height: 10rpx;" v-if="index!='syyf'&&index!='createTag'">
						{{j[index]}}
					</uni-td>
					<uni-td :key="120">

						<!-- <uni-tag :text="j['syyf']" size="normal" style="width: 60rpx;" :type="j['createTag']?'success':state[nu]" @click="bindClick(nu)" ref="tagUse"> -->
						<uni-tag :text="j['syyf']" ref="tagUse" size="normal" style="width: 60rpx;" :type="j['createTag']?'success':state[nu]" @click="bindClick(nu)">
							拟好</uni-tag>
						<!-- <uni-tag size="normal" style="width: 60rpx;" inverted="true" :text="j['syyf']"
							:type="j['syyf']=='已拍'?'primary':'error'"></uni-tag> -->
					</uni-td>
					<!-- <uni-td :key="120"><button @click="use(j)" style="width: 120rpx;font-size: small;color: #FFFAFA; background-color: rgba(49, 139, 74, 1)">编辑</button></uni-td>
	 -->
				</uni-tr>


			</uni-table>
			<!-- table2 -->
			<uni-table @selection-change="change" border stripe emptyText="暂无更多数据"
				style="max-height:750rpx; margin-top: 2%;" v-if="showTable2" :key="2">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center" v-for="i,k in header" width="10" :key="k">{{i}}</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="j,nu in listThird" :key="nu">
					<uni-td v-for="w,index in listThird[0]" width="40" style="height: 10rpx;" v-if="index!='syyf'">
						{{j[index]}}
					</uni-td>
					<uni-td :key="120">
						<uni-tag size="normal" style="width: 60rpx;" inverted="true" :text="j['syyf']"
							:type="j['syyf']=='已拍'?'primary':'error'"></uni-tag>
					</uni-td>
					<!-- <uni-td :key="120"><button @click="use(j)" style="width: 120rpx;font-size: small;color: #FFFAFA; background-color: rgba(49, 139, 74, 1)">编辑</button></uni-td>
			-->
				</uni-tr>


			</uni-table>
		</uni-card>
		<view>
			<uni-tag :text="'累计金额:'+chooseNum+`元`"></uni-tag>
			<uni-tag :text="'累计数量:'+chooseNum+`份`"></uni-tag>
		</view>
		<!-- 	<view><uni-tag :text="'累计金额:'+chooseNum+`份`"></uni-tag>
		</view> -->
<!-- 		<view>
			<uni-row class="info position-sticky fixed-bottom3">
				<uni-col :span="7">
					<uni-tag :text="`总共`+totalContent+`条`" style="margin-top: 13rpx; margin-left: 90rpx;padding: 0;">
					</uni-tag>
				</uni-col>
				<uni-col :span="11">

					<uni-pagination style="margin-top: 15rpx;font-size: 15rpx; width: 380rpx;" title="标题文字"
						:total="totalContent" @change="paginationChange"></uni-pagination>
				</uni-col>
			</uni-row>
		</view> -->
		<view>
			<button type="default" @click=" " class="info position-sticky fixed-bottom">{{qsOrfx}}</button>
			<button type="default" @click="dcClick" class="info position-sticky fixed-bottom2">{{hddcOrfh}}</button>
		</view>
	</view>
</template>

<script>
	import HeaderUse from "@/components/headerUse/header.vue"
	export default {
		components: {
			HeaderUse
		},
		// computed:{
		// state(){
		// 	let i = []
		// 	return()=>{
		// 			i[index] = "primary"
		// 			return i
		// 		}
			
		// }},
			
	
		// watch:{
		// 	list:{
		// 		handler(val){
		// 			console.log(state)
		// 			for(let i in val.length){
		// 				state[i] = "normal"
		// 				console.log(state)
		// 			}
		// 		},
		// 		immediate:true
				
				
		// 	}
			
		// },
		data() {
			return {
				// copyStateTag:[],
				state:[],
				createTag: false,
				single: "2021-04-3",
				showTable1: true,
				showTable2: false,
				showHd: true,
				listThird: [{}],
				carOrgoodsNum: '',
				tagKey:1,
				chooseNum: 0,
				// totalContent: 100,
				qsOrfx: '提交',
				hddcOrfh: '回单导出',
				// styleUse:{height: '100%'},
				datetimerange: "",
				header: ['序号', '合同号', '车号/日期', '出发地', '目的地', '承运运费', '扣款', '预付运费', '剩余运费'],
				listSecond: [],
				list: [{
						id: 1,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:true
						

					}, {
						id: 2,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:false

					},
					{
						id: 3,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:false

					},
					{
						id: 4,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:false

					},
					{
						id: 5,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:true

					},
					{
						id: 6,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:true

					}, {
						id: 7,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:true

					}, {
						id: 8,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:true

					},
					{
						id: 9,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:true
					},
					{
						id: 10,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:true

					},
					{
						id: 11,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:true

					},
					{
						id: 12,
						hth: "00254868",
						rqch: "2021/05/24苏L12058",
						chd: "武汉市",
						mdd: "镇江市",
						cyyf: "1000",
						kk: "0",
						yfyf: "100",
						syyf: "900",
						createTag:true

					},

				]

			}
		},
		mounted() {
			this.listSecond = this.list
			for(let i in this.list){
				this.state[i] = "normal"
			}
		},
		methods: {
			change(e) {
				console.log(e)
				this.chooseNum = e.detail.index.length
				let k = 0
				for (let i in this.list) {
					for (let j in e.detail.index) {
						if (i == j) {
							this.listThird[k] = this.list[i]
							k++
						}

					}
				}


				console.log(this.listThird)
			},
			use(e) {
				console.log(e)

			},
			dcClick() {
				if (this.qsOrfx == "分享") {
					this.showTable1 = true
					this.showTable2 = false
					this.qsOrfx = "签收"
				} else {
					this.showTable1 = false
					this.showTable2 = true
					this.qsOrfx = "分享"
				}
				if (this.hddcOrfh == "返回") {
					this.hddcOrfh = "回单导出"
				} else {
					this.hddcOrfh = "返回"
				}
				// this.showHd = false


			},
			searchUse() {
				// console.log(this.datetimerange[0].replaceAll("-","/"))
				// if (this.datetimerange=='' || this.carOrgoodsNum.length<=0) {
				// 	this.list = this.listSecond
				// }else{
				this.listSecond = this.list.filter( //便编写的查询过滤器考虑把次放出去因为每个的页面需要的过滤属性不一样
					(data) =>
					!this.carOrgoodsNum ||
					(data['rqch'] + "")
					.toLowerCase()
					.includes(this.carOrgoodsNum.toLowerCase())
				).filter(
					// data => !this.datetimerange[0] ||
					// (data['rqch'] + "")
					// .toLowerCase()
					// .includes(this.datetimerange[0].replaceAll("-", "/").toLowerCase())

				)
				// .filter(data => !this.datetimerange[1] ||
				// 	(data['rqch'] + "")
				// 	.toLowerCase()
				// 	.includes(this.datetimerange[1].replaceAll("-", "/").toLowerCase()));
				// }


			},
			bindClick(index) {
				if (this.createTag == false) {
					if (this.state[index] == "primary") {
						this.state[index] = "normal"
					} else if (this.state[index] == "normal") {
						this.state[index] = "primary"
						// console.log(this.state[index])
					}
				}
				// console.log(this.state[index])
				// console.log(this.$refs.tagUse[index]._props.type)
				this.$forceUpdate()
				    
				

			}
		}
	}
</script>

<style>
	.uni-input-placeholder {
		font-size: xx-small !important;
	}

	.uni-input-input {
		font-size: xx-small !important;
	}

	/deep/ .uni-date-x.uni-date-single {
		height: 57rpx;
	}

	/deep/ .uni-easyinput__content.is-input-border {
		height: 60rpx !important;
		min-height: 0;
	}

	.position-sticky {
		position: -webkit-sticky !important;
		position: sticky !important;
	}

	.fixed-bottom {
		position: fixed !important;
		height: 80rpx;
		margin-left: 0;
		background-color: rgba(49, 139, 74, 1);
		font-size: large;
		color: #FFFAFA;
		right: 0;
		bottom: calc(var(--window-bottom) + 3px);
		left: 0;
		margin-bottom: 6;
	}

	.fixed-bottom2 {
		position: fixed !important;
		width: 80px;
		height: 30px;
		margin-right: 10rpx;
		background-color: rgba(49, 139, 74, 1);
		font-size: small;
		color: #FFFAFA;
		right: 0;
		bottom: calc(var(--window-bottom) + 130rpx);
		left: 0;
		margin-bottom: 6;
	}

	.fixed-bottom3 {
		position: fixed !important;
		margin-right: 10rpx;
		font-size: small;
		right: 0;
		bottom: calc(var(--window-bottom) + 180rpx);
		left: 0;
		margin-bottom: 6;
	}

	.uni-card.uni-border {
		/* max-height: 1000px; */
		margin: 0;
	}
</style>

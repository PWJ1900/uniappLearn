<template>
	<view>
		<qshd v-if="qshdDefine&&!searchDefine" @qshdReturn="getqshd"></qshd>
		<!-- &&!hdqsDefine -->
		<sjkh v-if="sjkhDefine&&!searchDefine" @sjkhDefine="getsjkh"></sjkh>
		<!-- &&!hdqsDefine -->
		<hdqs v-if="searchDefine" @hdqsDefine="gethdqs"></hdqs>
<!-- 		<qshd v-if="qshdDefine&&!hdqsDefine" @qshdReturn="getqshd"></qshd>
		<uni-popup ref="popup1" type="bottom">底部弹出 Popup
				<sjkh  @sjkhDefine="getsjkh"></sjkh>
		</uni-popup>
		<hdqs v-if="hdqsDefine" @hdqsDefine="gethdqs"></hdqs> -->
	
	</view>
</template>
<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	import qshd from "./qshd.vue"
	import sjkh from "./sjkh.vue"
	import hdqs from "./hdqs.vue"
	export default {
		props:{
			tranToqshd:{
				type:Boolean,
				default:false
			}
		},
		components:{qshd,sjkh,hdqs},
		data() {
			return {
				qshdDefine:true,
				sjkhDefine:false,
				hdqsDefine:false
				
				
			}
		},
		computed:{
			...mapState(['searchDefine','returnOrgin']),
		},
		watch:{
			returnOrgin(val){
				if(val==true){
					this.sjkhDefine = false
					this.qshdDefine = true
				}
			}
		},
		methods: {
			// ...mapMutations(['changeSearch']),
			...mapMutations(['changeSearch','returnOrginUse']),
			getqshd(data){
				this.qshdDefine = data
				this.returnOrginUse(false)
				this.sjkhDefine = true
				
				// this.$refs.popup1.open("center")
				
			},
			getsjkh(data){
				this.sjkhDefine = data
				this.qshdDefine = true
				
				// this.$refs.popup1.colse()
			},
			gethdqs(data){
				this.qshdDefine = true
				this.sjkhDefine = false
				this.changeSearch(false)
				
			}
			
			
			
		}
	}
</script>

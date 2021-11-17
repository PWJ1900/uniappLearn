<template>
	<view>	
		<HeaderUse></HeaderUse>
		<htcz v-if='pageUse["usehtcz"]'></htcz>
		<sqzj v-if='pageUse["usesqzj"]'></sqzj>
		<qshd v-if='pageUse["useqshd"]'></qshd>
		<!-- @SearchReturn="defineSearch" -->
		<xzcl v-if='pageUse["usexzcl"]'></xzcl>
		<zfzj v-if='pageUse["usezfzj"]'></zfzj>
		<index v-if='pageUse["useindex"]'></index>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	import HeaderUse from "@/components/headerUse/header.vue"
	import qshd from "../qshd/index.vue"
	import sqzj from "../sqzj/index.vue"
	import xzcl from "../xzcl/index.vue"
	import zfzj from "../zfzj/index.vue"
	import index from "../index/index.vue"
	import htcz from "../htcz/index.vue"
	export default {
		components:{HeaderUse,htcz,sqzj,index,zfzj,xzcl,qshd},
		data() {
			return {
				gettranToqshd:false
				// usehtcz:false,
			 //    usesqzj:false,
			 //    useqshd:false,
			 //    usesqzj:false,
			 //    usexzcl:false,
			 //    usezfzj:false,
			 //    useindex:true
				
			}
			
		},
		computed:{
			...mapState(["pageUse"])
		},
		methods: {
			// defineSearch(e){
			// 	this.gettranToqshd = e			
			// }
		
			
		},
	}
</script>

<style>

</style>

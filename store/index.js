import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		current: 0,
		returnOrgin: false,//判断主页面内是否点击
		defineId:false,
		tabs: [{
			name: '寻找车量',
			path: '/pages/xzcl/index',
		}, {
			name: '成交订单',
			path: '/pages/index/index'
		}, {
			name: '申请资金',
			path: '/pages/sqzj/index'
		}],
		current2: -1,
		tabs2: [{
			name: '支付资金',
			path: '/pages/zfzj/index',
		}, {
			name: '签收回单',
			path: '/pages/qshd/index'
		}, {
			name: '合同冲账',
			path: '/pages/htcz/index'
		}],
		pageUse:{
			usexzcl: false,
			useindex: true,
			usesqzj: false,
			usezfzj: false,
			useqshd: false,
			usehtcz: false,
			
	},
	searchDefine:false,
	},
	mutations: {
		changeSearch(state, val){
		     state.searchDefine = val
			
		},
		changeDefine(state, val){
		     state.defineId = val
			
		},
		changeTab(state, index) {
			let j = 0
			for(let i in state.pageUse){
				if(j == index){
					state.pageUse[i] = true
				}
				else{
					state.pageUse[i] = false
				}
				j++
			}
			state.current2 = -1
			state.current = index
			console.log('当前选中的项：' + index)
		},
		changeTab2(state, index) {
			let j = -3
			for(let i in state.pageUse){
				if(j == index){
					state.pageUse[i] = true
				}
				else{
					state.pageUse[i] = false
				}
				j++
			}
			state.current = -1
			state.current2 = index
			console.log('当前选中的项：' + index)
		},
		returnOrginUse(state,val){
			state.returnOrgin = val
		},
	},
	actions: {


	},
	getters: {
		current(state, getters) {
			return state.current
		},
		current2(state, getters) {
			return state.current2
		},
	}
})
export default store

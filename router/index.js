// router.js
import {RouterMount,createRouter} from '../js_sdk/hhyang-uni-simple-router/uni-simple-router.js';
import store from '../store/index.js'
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	next()
if(to.meta.auth==true){
	if(store.state.defineId == true){
		next()
	}
}else{
	// next('/pages/login/index')
	
}
	
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
	router,
	RouterMount
}
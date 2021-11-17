<template>
	<view>
		<button @click="jump">登陆</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			jump(){
				this.$store.commit("changeDefine", true)
				uni.navigateTo({
					url:'/pages/main/index'
				})
				
			}
			
		}
	}
</script>

<style>

</style>

<template>
    <button type="default" @click="onShare">APP分享</button>
</template>

<script>
    // 引入方法
    import appShare, { closeShare } from '@/uni_modules/zhouWei-APPshare/js_sdk/appShare';
    export default {
        methods: {
            onShare(){
                let shareData = {
                    shareUrl:"https://kemean.com/",
                    shareTitle:"分享的标题",
                    shareContent:"分享的描述",
                    shareImg:"http://qn.kemean.cn//upload/202004/18/1587189024467w6xj18b1.jpg",
                    appId : "wxd0e0881530ee4444", // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
                    appPath : "pages/home/home",
                    appWebUrl : "https://kemean.com/",
                };
                // 调用
                let shareObj = appShare(shareData,res => {
                    console.log("分享成功回调",res);
                    // 分享成功后关闭弹窗
                    // 第一种关闭弹窗的方式
                    closeShare();
                });
                setTimeout(() => {
                    // 第二种关闭弹窗的方式
                    shareObj.close();
                },5000);
            }
        }
    }
</script>
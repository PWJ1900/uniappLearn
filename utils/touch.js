const move = (event)=>{
	console.log(21)
	let touch = event.touches[0];  //滑动过程中，手指滑动的坐标信息 返回的是Objcet对象
	this.touch = touch;
	let data = touch.clientX - this.startData.clientX;
	if(touch.clientX < this.startData.clientX) {  //向左移动
		if(data<-250) {
			data = -250;
		}
	}
	if(touch.clientX > this.startData.clientX) {  //向右移动
		if(this.moveX == 0) {
			data = 0
		} else {
			if(data>50) {
				data = 50;
			}
		}
	}
	this.moveX = data;
}
export {move}
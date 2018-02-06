/*智游教育*/
//控件类，页面所有可见元素都从这里继承
//提供了创建元素功能（render方法）和布局功能（layout方法）
function Control(){
	this.render()
	this.layout()
}
//填充颜色
Control.prototype.fillColor = 'black'
//添加到页面上
Control.prototype.render = function(){
	this.ele = document.createElement('div')
	this.ele.style.backgroundColor = this.fillColor
	this.ele.style.position = 'absolute'
	document.body.appendChild(this.ele)
}
//调整大小及在页面上的位置
Control.prototype.layout = function(){}


//添加窗口工作区宽高数据到Control，以便子对象使用
Control.windowResized = function(){
	Control.clientWidth = document.documentElement.clientWidth
	Control.clientHeight = document.documentElement.clientHeight
	Control.radius = Math.min(Control.clientWidth, Control.clientHeight) / 2
	console.log('窗口工作区宽高：%d, %d', Control.clientWidth, Control.clientHeight)
}
Control.windowResized()


//时钟中央的圆点
function Dot(){
	Control.call(this)
}

Dot.prototype = Object.create(Control.prototype)
Dot.prototype.constructor = Dot

Dot.prototype.render = function(){
	Control.prototype.render.call(this)
	this.ele.style.borderRadius = '50%'
	this.ele.style.zIndex = 10
}
Dot.prototype.layout = function(){
	var radius = Control.radius * 0.04
	this.ele.style.width = radius * 2 + 'px'
	this.ele.style.height = radius * 2 + 'px'
	this.ele.style.top = Control.clientHeight / 2 - radius + 'px'
	this.ele.style.left = Control.clientWidth / 2 - radius + 'px'
}

//秒针
function Second(color){
	this.fillColor = color || 'red'
	Control.call(this)
}

Second.prototype = Object.create(Control.prototype)
Second.prototype.constructor = Second

Second.prototype.calcArgs = function(){
	var args = {}

	args.duration = 60
	args.zIndex = 9
	
	var time = new Date();
    var s = time.getSeconds() * -1;
    args.delay = s - 15;
	
	return args
}
Second.prototype.calcLayoutArgs = function(){
	var args = {}
	
	args.radius = Control.radius * 0.9
	args.width = args.radius * 1.15
	args.height = args.radius * 0.01
	
	return args
}
Second.prototype.render = function(){
	var args = this.calcArgs()
	
	Control.prototype.render.call(this)
	this.ele.style.backgroundColor = 'initial'
	this.ele.style.animationName = 'rotate'
	this.ele.style.animationTimingFunction = 'linear'
	this.ele.style.animationIterationCount = 'infinite'
	this.ele.style.animationDuration = args.duration + 's'
	this.ele.style.animationDelay = args.delay + 's'
	this.ele.style.zIndex = args.zIndex
	
	this.el = document.createElement('span')
	this.el.style.display = 'block'
	this.el.style.backgroundColor = this.fillColor
	this.ele.appendChild(this.el)
}
Second.prototype.layout = function(){
	var args = this.calcLayoutArgs()
	
	this.ele.style.width = args.radius * 2 + 'px'
	this.ele.style.height = 10 + 'px'
	this.ele.style.top = Control.clientHeight / 2 - 5 + 'px'
	this.ele.style.left = Control.clientWidth / 2 - args.radius + 'px'
	
	this.el.style.width = args.width + 'px'
	this.el.style.height = args.height + 'px'
	this.el.style.marginTop = 5 - args.height / 2 + 'px'
	this.el.style.borderRadius = args.height / 2 + 'px'
}

//分针
function Minute(color){
	Second.call(this, color || 'black')
}

Minute.prototype = Object.create(Second.prototype)
Minute.prototype.constructor = Minute

Minute.prototype.calcArgs = function(){
	var args = {}
	
	args.duration = 3600
	args.zIndex = 8
	
	var time = new Date();
    var s = time.getSeconds() * -1;
    var m = time.getMinutes() * -1;
    args.delay = (m * 60) - (15 * 60) + s;
	
	return args
}
Minute.prototype.calcLayoutArgs = function(){
	var args = {}
	
	args.radius = Control.radius * 0.8
	args.width = args.radius * 1.12
	args.height = args.radius * 0.03
	
	return args
}


//时针
function Hour(color){
	Second.call(this, color || 'black')
}

Hour.prototype = Object.create(Second.prototype)
Hour.prototype.constructor = Hour

Hour.prototype.calcArgs = function(){
	var args = {}
	
	args.duration = 43200
	args.zIndex = 8
	
	var time = new Date(); 
    var s = time.getSeconds() * -1;
    var m = time.getMinutes() * -1;
    var h = time.getHours();
    h = h > 12 ? h - 12 : h;
    h = h * -1;
    args.delay = (h * 60 * 60) - (3 * 60 * 60) + (m * 60) + s
	
	return args
}
Hour.prototype.calcLayoutArgs = function(){
	var args = {}
	
	args.radius = Control.radius * 0.6
	args.width = args.radius * 1.13
	args.height = args.radius * 0.05
	
	return args
}
//时钟周围的小圆点
function Diamond(minute, sizeRadio){
	this.minute = minute
	this.sizeRadio = sizeRadio || 0.01
	this.arc = 6 * (this.minute - 15) * 2 * Math.PI / 360
	Control.call(this)
}

Diamond.prototype = Object.create(Control.prototype)
Diamond.prototype.constructor = Diamond

Diamond.prototype.render = function(){
	Control.prototype.render.call(this)
	this.ele.style.borderRadius = '50%'
	this.ele.style.zIndex = 5
}
Diamond.prototype.layout = function(){
	var size = Control.radius * this.sizeRadio
	this.ele.style.width = size * 2 + 'px'
	this.ele.style.height = size * 2 + 'px'
	
	var radius = Control.radius * 0.9
	var left = radius * Math.cos(this.arc)
	var top = radius * Math.sin(this.arc)
	
	this.ele.style.top = Control.clientHeight / 2 + top - size + 'px'
	this.ele.style.left = Control.clientWidth / 2 + left - size + 'px'
}

function Clock(){
	//添加样式表
	var i = 0
	var style = document.createElement('style')
	document.head.appendChild(style)
	style.sheet.insertRule('html{height:100%}', i++)
	style.sheet.insertRule('body{margin:0;height:100%}', i++)
	style.sheet.insertRule('*{box-sizing:border-box}', i++)
	style.sheet.insertRule('@keyframes rotate{from{ transform: rotate(0); } to{ transform: rotate(360deg); }}', i++)
	
	
	//创建时钟
	var dot = new Dot()
	var second = new Second()
	var minute = new Minute('blue')
	var hour = new Hour('green')
	
	var diamonds = []
	for(var i = 0; i < 60; i++){
		var sizeRadio = i % 5 == 0 ? 0.02 : 0
		diamonds.push(new Diamond(i, sizeRadio))
	}

	//窗口尺寸变化时重新布局
	window.onresize = function(){
		Control.windowResized()
		dot.layout()
		second.layout()
		minute.layout()
		hour.layout()
		
		for(var i = 0; i < 60; i++){
			diamonds[i].layout()
		}
	}
}

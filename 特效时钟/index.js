
var Radius=8;
// var myHeight=540;
// var myWidth=1024;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;
var balls = [];
const colors = ["#33b5e5","#0099cc","#DC143C","#99ccff","#008000","#FF0000","#FF00FF","#00FFFF","#4169E1","#FFA500"];
var curSeconds=0;
window.onload=function(){

	myWidth=document.body.clientWidth;

	myHeight=document.documentElement.clientHeight;
	MARGIN_LEFT=Math.round(myWidth/5);
	Radius=Math.round(myWidth*3/5/108)-1;
	MARGIN_TOP=Math.round(myHeight/8);

	var canvas=document.getElementById("myCanvas");
	var	context=canvas.getContext("2d");
	canvas.width=myWidth;
	canvas.height=myHeight;

	curSeconds=getShowSeconds();

	setInterval(function(){
		clock(context);
		update();
	},50);
}


function getShowSeconds(){
	var nowTime=new Date();
	var ret =nowTime.getHours()*3600+nowTime.getMinutes()*60+nowTime.getSeconds();
	
	return ret;
}
function update(){
	var nextSeconds=getShowSeconds();
	var nextHours=parseInt(nextSeconds/3600);
	var nextMinutes=parseInt((nextSeconds-nextHours*3600)/60);
	var next_seconds=nextSeconds%60;//下一个时间

	var curHours=parseInt(curSeconds/3600);
	var curMinutes=parseInt((curSeconds-curHours*3600)/60);
	var cur_seconds=curSeconds%60;//现在的时间
	
	if(next_seconds!=cur_seconds){
		if (parseInt(curHours/10)!=parseInt(nextHours/10)) {
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
		};//判断小时第一位数字是否改变
		if (parseInt(curHours%10)!=parseInt(nextHours%10)) {
			addBalls(MARGIN_LEFT+15*(Radius+1),MARGIN_TOP,parseInt(curHours%10));
		};//判断小时的第二位数字是否改变
		if (parseInt(curMinutes/10) != parseInt(nextMinutes/10)) {
			addBalls( MARGIN_LEFT+39*(Radius+1),MARGIN_TOP,parseInt(curMinutes/10));
		};//判断分钟第一位数字是否改变
		if (parseInt(curMinutes%10)!=parseInt(nextMinutes%10)) {
			addBalls(MARGIN_LEFT+54*(Radius+1),MARGIN_TOP,parseInt(curMinutes%10))
		};//判断分钟第二位数字是否改变
		if (parseInt(cur_seconds/10)!=parseInt(next_seconds/10)) {
			addBalls(MARGIN_LEFT+78*(Radius+1),MARGIN_TOP,parseInt(cur_seconds/10))
		};//
		if (parseInt(cur_seconds%10)!=parseInt(next_seconds%10)) {
			addBalls(MARGIN_LEFT+93*(Radius+1),MARGIN_TOP,parseInt(cur_seconds%10))
		};


		curSeconds=nextSeconds;
	}
	updateBalls();
	// console.log(balls.length);
}
function updateBalls () {
	// 彩色小球的运动
	for (var i = 0; i < balls.length; i++) {
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		//碰撞检测
		if (balls[i].y>=myHeight-Radius) {
			balls[i].y=myHeight-Radius;
			balls[i].vy=-balls[i].vy*0.75
		};

	};
	
}
function addBalls (x,y,num) {
	for (var i = 0; i < myArr[num].length; i++) {
		for (var j = 0; j < myArr[num][i].length; j++) {
			if (myArr[num][i][j]==1) {
				var aBall = {
					x:x+2*j*(Radius+1)+(Radius+1),
					y:y+2*i*(Radius+1)+(Radius+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*10))*6,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			};
		};
	};	
}
function clock(cxt){
//清除画布
	cxt.clearRect(0,0,myWidth,myHeight);
	var	hours=parseInt(curSeconds/3600);
	var minutes=parseInt((curSeconds-hours*3600)/60);
	var second=curSeconds%60;
//把数字拆开， 如15拆成1和5
	drawClock(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	drawClock(MARGIN_LEFT+15*(Radius+1),MARGIN_TOP,parseInt(hours%10),cxt)
	drawClock(MARGIN_LEFT+30*(Radius+1),MARGIN_TOP,10,cxt)
	drawClock(MARGIN_LEFT+39*(Radius+1),MARGIN_TOP,parseInt(minutes/10),cxt)
	drawClock(MARGIN_LEFT+54*(Radius+1),MARGIN_TOP,parseInt(minutes%10),cxt)
	drawClock(MARGIN_LEFT+69*(Radius+1),MARGIN_TOP,10,cxt)
	drawClock(MARGIN_LEFT+78*(Radius+1),MARGIN_TOP,parseInt(second/10),cxt)
	drawClock(MARGIN_LEFT+93*(Radius+1),MARGIN_TOP,parseInt(second%10),cxt)

	//绘制彩色小球
	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle=balls[i].color;
//中心坐标X，Y 半径， 起始角，结束角 顺时针
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,Radius,0,2*Math.PI,true)
		cxt.closePath();
		cxt.fill();
	};
}
function drawClock (x,y,num,cxt) {
	cxt.fillStyle="rgb(0,102,153)";

	for (var i = 0; i < myArr[num].length; i++) {
		for (var  j= 0; j < myArr[num][i].length; j++) {
			if(myArr[num][i][j]==1){
				cxt.beginPath();
				//中心坐标X，Y 半径， 起始角，结束角
				cxt.arc(x+j*2*(Radius+1)+(Radius+1),y+i*2*(Radius+1)+(Radius+1),Radius,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		};
	};
}
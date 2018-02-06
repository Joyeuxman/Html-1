            // 速度为1
            var VELOCITY = 1;
            // 把颗粒的数量设置为400
			var PARTICLES = 400;
			// 把鼠标的x和y设置成了0
			var mouse = {x:0, y:0};
			// 把颗粒设成了一个空数组
			var particles = [];
			// 设置了红黄黑三种颜色的数组
			var colors = [ "#000000","#FF0000","#FFFF00" ];
			// 获取画布
			var canvas = document.getElementById('projector');
            
			var context;
			// 如果画布和绘图环境都存在时
			if (canvas && canvas.getContext) {
            // 把绘图环境设置为2d
				context = canvas.getContext('2d');
				// 用for循环添加颗粒
				for( var i = 0; i < PARTICLES; i++ ) {
					// push到画布上
					particles.push( { 
						// 位置随机出现到窗口中
						x: Math.random()*window.innerWidth, 
						y: Math.random()*window.innerHeight, 
                        // 这种写法可以让颗粒上下左右运动随机
						vx: ((Math.random()*(VELOCITY*2))-VELOCITY),
						vy: ((Math.random()*(VELOCITY*2))-VELOCITY),
						// 大小是1-4中随机的
						size: 1+Math.random()*3,
						// 颜色随机从那三个中取一个
						color: colors[ Math.floor( Math.random() * colors.length ) ]
					} );
				}
				
				Initialize();
			}
			
			function Initialize() {
				// 画布上监听鼠标移动了，调用MouseMove函数
				canvas.addEventListener('mousemove', MouseMove);
				// 鼠标点击监听
				window.addEventListener('mousedown', MouseDown);
                // 窗口改变执行ResizeCanvas函数
				window.addEventListener('resize', ResizeCanvas);
				// 以每20毫秒的速度调用TimeUpdate函数
				setInterval( TimeUpdate, 20 );
				// 先运行一次这个函数
				ResizeCanvas();
			}
			
			function TimeUpdate(e) {
				// 清除这个画布上的画面
				// 作用就是清除上一次调用留下的画面
				// 原理就像定格动画
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				// 获取颗粒的数量
				var len = particles.length;
				// 和颗粒
				var particle;
				// 用for循环得到当前颗粒
				for( var i = 0; i < len; i++ ) {
					particle = particles[i];
					// frozen是冰冻的意思
					if (!particle.frozen) {
						// 将变化后的x，y坐标加上去
						particle.x += particle.vx;
						particle.y += particle.vy;
						// 这种情况是当颗粒到达右边框
						if (particle.x > window.innerWidth) {
							// 让它向左运动
							particle.vx = -VELOCITY - Math.random();
						}
						// 还有到达左边框
						else if (particle.x < 0) {
							// 向右运动
							particle.vx = VELOCITY + Math.random();
						}
						// 纵轴同理
						if (particle.y > window.innerHeight) {
							particle.vy = -VELOCITY - Math.random();
						}
						else if (particle.y < 0) {
							particle.vy = VELOCITY + Math.random();
						}
						// 获取鼠标和颗粒之间的距离
						var distanceFactor = DistanceBetween( mouse, particle );
						// 这种方式取得依靠鼠标距离方式获得1 - 10的数，不是整数
						// 鼠标越近值越大
						distanceFactor = Math.max( Math.min( 15 - ( distanceFactor / 10 ), 10 ), 1 );
						// 把这个数乘以颗粒的大小，鼠标越近颗粒越大越大，最大为10
						particle.currentSize = particle.size*distanceFactor;
					}
					// 把颗粒的颜色填充到内容中
					context.fillStyle = particle.color;
					// 丢弃任何当前定义的路径并且开始一条新的路径
					context.beginPath();
                    // 这个方法是画一个圆
					context.arc(particle.x,particle.y,particle.currentSize,0,Math.PI*2,true);
                    // 回到开始点
					context.closePath();
                    // 填充
					context.fill();
					
				}
			}
			
			function MouseMove(e) {
				// layerX是火狐特有属性，是指当前触发的元素的位置
				// 我们的鼠标在画布上移动，所以就是鼠标在画布上的位置
				mouse.x = e.layerX;
				mouse.y = e.layerY;
			}
			
			function MouseDown(e) {
				// 颗粒的数量
				var len = particles.length;
				
				var closestIndex = 0;
				// 设置靠近鼠标的距离为1000
				var closestDistance = 1000;
				
				for( var i = 0; i < len; i++ ) {
					// DistanceBetween在。。。之间的距离
					// 这里获得了颗粒和鼠标之间的距离
					var thisDistance = DistanceBetween( particles[i], mouse );
					// 如果这个距离小于先前设置的1000
					if( thisDistance < closestDistance ) {
						// 让这个动态的距离赋给设置好的静态距离
						closestDistance = thisDistance;
                        
						closestIndex = i;
					}
					
				}
				// 如果两距离小于颗粒大小，让当前颗粒冻住
				if (closestDistance < particles[closestIndex].currentSize) {
					particles[closestIndex].frozen = true;
				}
			}
			// 这个函数获取了窗口的大小，设置成画布大小
			// 这样改变浏览器窗口的时候，画布永远占满屏幕
			function ResizeCanvas(e) {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}
			
			function DistanceBetween(p1,p2) {
				// 两个坐标的xy轴的差
				var dx = p2.x-p1.x;
				var dy = p2.y-p1.y;
				// return出两坐标的直线距离
				return Math.sqrt(dx*dx + dy*dy);
			}
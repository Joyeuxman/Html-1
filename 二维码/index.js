// jQuery.ready()函数
// 该函数用于在当前文档结构载入完毕后立即执行指定的函数
// 相当于window.onload事件
// 两者的区别
// 与window.onload事件相比，ready()具有较高的执行优先级。
// window.onload必须等到当前页面中包括图片在内的所有元素全部加载完毕后才会执行；
// ready()是等到HTML结构绘制完毕后就立即执行，不必等到图片等所有资源加载完毕。

// jQuery.ready()函数三种等价写法
// function handler(){
// 	//这里是需要执行的代码
// }
// // 形式一
// $(document).ready(handler);
// // 形式二
// $().ready(handler);
// // 形式三
// $(handle);

$(function(){
	var str = "http://www.baidu.com";
	// $('#code').qrcode(str);
	$("#code").qrcode({
		text: str,           //设置二维码内容 
		render: "table",     //设置渲染方式 ,qrcode支持canvas和table两种方式进行图片渲染
                             //默认使用canvas方式，效率最高
		width: 200,          //设置宽度 
		height:200,          //设置高度
	});
	// 给按钮添加点击事件，清空之前的内容并添加新的内容
	$("#lgh-btn").click(function(){
		$("#code").empty();
		var str = toUtf8($("#lgh-content").val());
		$("#code").qrcode({
			render: "table",
			width: 200,
			height:200,
			text: str
		});
	});
})

// jquery-qrcode是采用charCodeAt()方式进行编码转换的。
// 而这个方法默认会获取它的 Unicode 编码，一般的解码器都是采用UTF-8, ISO-8859-1等方式，
//英文是没有问题，如果是中文，一般情况下Unicode是UTF-16实现，
// 长度2位，而UTF-8编码是3位，这样二维码的编解码就不匹配了。
// 解决方式当然是，在二维码编码前把字符串转换成UTF-8，具体代码如下：
function toUtf8(str) {   
    var out, i, len, c;   
    out = "";   
    len = str.length;   
    for(i = 0; i < len; i++) {   
    	c = str.charCodeAt(i);   
    	if ((c >= 0x0001) && (c <= 0x007F)) {   
        	out += str.charAt(i);   
    	} else if (c > 0x07FF) {   
        	out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
        	out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	} else {   
        	out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	}   
    }   
    return out;   
}  
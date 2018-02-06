// 通过读取调用标签的内容，形成字符串。
// 1、当调用标签设置有高的时候，获取它的高，将超过的部分隐藏，
// 同时形成一个点击标记，点击显示剩余部分和隐藏    
//  2、没有设置高时，可以外部传递参数，来隐藏内容
// 具体是用字符串的substr函数来切割字符串
(function ($) {
	function hidden(ele, num) {
		var $ele = $(ele)
		var num = isNaN(num) ? 0 : num
		var h = Math.ceil($ele.height())
		// 
		var pT = parseFloat($ele.css('padding-top'))
		var pB = parseFloat($ele.css('padding-bottom'))
		var H = $ele.get(0).scrollHeight //所有内容高度，包括隐藏的,和内边距
		console.log(H + ' ' + h)
		var textt = $ele.html() //获取该标签的文本内容，一个存储
		var texts = $ele.html() //一个用来截取
		console.log('777', texts.length)

        console.log('111', $ele, '222', num, '333', h, '444', pT, '555', pB, '666', H)
		for (var i = 0; i < textt.length; i++) {
			if (H - pT - pB > h) { //截取掉溢出的文本
				texts = texts.substr(0, texts.length - 1)
				H = $ele.html(texts).get(0).scrollHeight //重新获取所有高度
			}
		}
		texts = texts.substr(0, texts.length - 4 - num) //-4是为了后面添加span标签
		hide()

		function hide() {
			$ele.html(texts)
			$('<span>').text('......[+]').appendTo(ele).css('cursor', 'pointer').click(function () {
				show()
			})
			$ele.height(h)
		}

		function show() {
			$ele.html(textt)
			$('<span>').text('[-]').appendTo(ele).css('cursor', 'pointer').click(function () {
				hide()
			})
			console.log($ele.get(0).scrollHeight) //此时只包括上内边距
			H = $ele.get(0).scrollHeight

			$ele.height(H)
		}
	}
	//传入标签
	$.fn.hidden = function (num) {
		this.each(function (i, ele) { //函数来对这个标签进行遍历（有可能获取的不是一个标签）
			hidden(ele, num) //i就是指向标签的索引ele就是i指向的标签
		})
		return this //这个标签
	}
})(jQuery)
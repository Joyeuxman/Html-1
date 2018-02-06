;
(function($, window, document, undefined) {
	'use strict';
	$.fn.myEmoji = function(options) {
		var defaults = {
			emojiconfig: {
				tieba: {
					name: "贴吧表情",
					path: "img/tieba/",
					maxNum: 50,
					file: ".jpg",
					placeholder: ":{alias}:",
					alias: {
						1: "hehe",
						2: "haha",
						3: "tushe",
						4: "a",
						5: "ku",
						6: "lu",
						7: "kaixin",
						8: "han",
						9: "lei",
						10: "heixian",
						11: "bishi",
						12: "bugaoxing",
						13: "zhenbang",
						14: "qian",
						15: "yiwen",
						16: "yinxian",
						17: "tu",
						18: "yi",
						19: "weiqu",
						20: "huaxin",
						21: "hu",
						22: "xiaonian",
						23: "neng",
						24: "taikaixin",
						25: "huaji",
						26: "mianqiang",
						27: "kuanghan",
						28: "guai",
						29: "shuijiao",
						30: "jinku",
						31: "shengqi",
						32: "jinya",
						33: "pen",
						34: "aixin",
						35: "xinsui",
						36: "meigui",
						37: "liwu",
						38: "caihong",
						39: "xxyl",
						40: "taiyang",
						41: "qianbi",
						42: "dnegpao",
						43: "chabei",
						44: "dangao",
						45: "yinyue",
						46: "haha2",
						47: "shenli",
						48: "damuzhi",
						49: "ruo",
						50: "OK"
					},
					title: {
						1: "呵呵",
						2: "哈哈",
						3: "吐舌",
						4: "啊",
						5: "酷",
						6: "怒",
						7: "开心",
						8: "汗",
						9: "泪",
						10: "黑线",
						11: "鄙视",
						12: "不高兴",
						13: "真棒",
						14: "钱",
						15: "疑问",
						16: "阴脸",
						17: "吐",
						18: "咦",
						19: "委屈",
						20: "花心",
						21: "呼~",
						22: "笑脸",
						23: "冷",
						24: "太开心",
						25: "滑稽",
						26: "勉强",
						27: "狂汗",
						28: "乖",
						29: "睡觉",
						30: "惊哭",
						31: "生气",
						32: "惊讶",
						33: "喷",
						34: "爱心",
						35: "心碎",
						36: "玫瑰",
						37: "礼物",
						38: "彩虹",
						39: "星星月亮",
						40: "太阳",
						41: "钱币",
						42: "灯泡",
						43: "茶杯",
						44: "蛋糕",
						45: "音乐",
						46: "haha",
						47: "胜利",
						48: "大拇指",
						49: "弱",
						50: "OK"
					}
				}
				//, AcFun: {
				// 	name: "AcFun表情",
				// 	path: "img/AcFun/",
				// 	maxNum: 54,
				// 	file: ".png"
				// }
			},
			postFunction: function() {
				alert(InputText.html());
				console.log(InputText.html());
			}
		};
		var opts = $.extend(defaults, options);
		var emojiconfig = opts.emojiconfig;
		var plBox = $(this);
		//操作的div

		// 通过class名找到各个元素
		var InputBox = plBox.find('.Input_Box');
		var faceDiv = plBox.find('.faceDiv');
		var InputText = InputBox.find('.Input_text');
		var InputFoot = InputBox.find('.Input_Foot');
		var imgBtn = InputFoot.find('.imgBtn');

// 笑脸图标绑定点击事件
		imgBtn.click(
			function() {
				// 找到盛放表情的section，这是一个大容器，如果他没有子元素，就给它设置宽度，并填充子元素
				var emojiContainer = faceDiv.find('.emoji_container');
				if (emojiContainer.children().length <= 0) {
					faceDiv.css({
						width: Math.floor(InputText.width() / 30) * 30 + 'px',
						display: 'block'
					});
					// 遍历emojiconfig，这里有俩表情包
					for (var emojilist in emojiconfig) {
						
						// 填充子元素，这个子元素用来放表情
						emojiContainer.append('<section class="for_' + emojilist + '"></section>');


						// 找到盛放表情包名字的容器，给它添加一个子元素，子元素中填入表情包名字
						faceDiv.find('.emoji_tab').append('<a href="#!" data-target="for_' + emojilist + '">' + emojiconfig[emojilist].name + '</a>');
						
						// 将表情放入刚才填充的子元素中
						for (var i = 1; i <= emojiconfig[emojilist].maxNum; i++) {
							if (emojiContainer.find('.for_' + emojilist) !== undefined) {
								emojiContainer.find('.for_' + emojilist).append('<a href="#!" class="_img"><img src="' + emojiconfig[emojilist].path + i + emojiconfig[emojilist].file + '" alt="" data-alias="'+(emojiconfig[emojilist].alias == undefined ? (i+emojiconfig[emojilist].file) : emojiconfig[emojilist].alias[i])+'" title="' + (emojiconfig[emojilist].title == undefined ? '' : emojiconfig[emojilist].title[i]) + '" /></a>');
							}
						}
					}

					// 在css样式中将表情包display：none，然后设置默认显示第一个表情包
					faceDiv.find('.emoji_container section')[0].style.display = 'block';

					// 给放表情包名字的容器再加一个class
					faceDiv.find('.emoji_tab a')[0].className += 'active';

					// 给表情包里的表情添加点击事件
					faceDiv.find('.emoji_container ._img').on('click', function() {
						if (InputText[0].nodeName === 'DIV') {
							InputText.append(this.innerHTML);
						} else {
							InputText.append('[' + $(this).find('img').attr('data-alias')+']');
						}

					});
					faceDiv.find('.emoji_tab a').on('click', function() {
						$(this).parent().prev().find('section').hide();
						// prev() 获得匹配元素集合中每个元素紧邻的前一个同胞元素,通过选择器进行筛选是可选的
						faceDiv.find('.emoji_container .' + $(this).attr('data-target')).show();
						faceDiv.find('.emoji_tab a').removeClass('active');
						this.className += ' active';
					});

					// 控制再次点击表情包消失（根据长度）
				} else {
					faceDiv.toggle();
				}
			}
		);


// 确定按钮添加点击事件，弹出你所选择的表情。div内无内容时，表情包不显示
		InputFoot.find('.postBtn').on('click', opts.postFunction);
		$(document).on('click', function(e) {
			if ((faceDiv.find($(e.target)).length) <= 0 && (InputBox.find($(e.target)).length <= 0)) {
				faceDiv.hide();
			}
		});
	};
})(jQuery, window, document);
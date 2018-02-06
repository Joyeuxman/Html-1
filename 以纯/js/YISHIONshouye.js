

// 轮播图区域

$('#autoshow,.next').hover(function(){
  $('.pre,.next').animate({opacity:1})  
},function(){
  $('.pre,.next').animate({opacity:0},700)
})
$('.pre,.next').hover(function(){
    $('.pre,.next').animate({opacity:0},700).finish()
    $('.pre,.next').css('opacity',1)
},function(){
    $('.pre,.next').animate({opacity:0},700)
})
$.fn.autoShow = function(){
    var i = 0;
    var interval;
    this.animate = function(){
        $('#autoshow').fadeOut(500,function(){
            $('#autoshow').attr('src','images/' + i%5 + '.jpg').fadeIn(1000)
            $('#n').text((i+1) + ' / 5').parent().children().css('background','white').parent().children('li:eq('+i+')').css('background-color','black')
        })
    }
    this.change = function(){
        i++
        if(i > 4){i = 0}
        this.animate()
    }.bind(this)
    this.play = function(){
        interval = setInterval(this.change,2500)
    }
    this.stop = function(){
        clearInterval(interval)
    }
    this.pre = function(){
        $('.pre').click(function(){
            this.stop()
            i = i - 1
            if(i < 0){i = 4}
            this.animate()
            this.play()
        }.bind(this))
    }
    this.next = function(){
        $('.next').on('click',function(){
            this.stop()
            i = i + 1
            if(i > 4){i = 0}
            this.animate()
            this.play()
        }.bind(this))
    }
    this.hover = function(){
        $('#autoshow').hover(function(){
            this.stop()
        }.bind(this),function(){
            this.play()
        }.bind(this))
        var that = this
        $('ol li').hover(function(){
            that.stop()
            var index = Number($(this).attr('index'))
        $('#autoshow').fadeOut(500,function(){
            $('#autoshow').attr('src','images/' + index + '.jpg').fadeIn(1000)
            
        })
            $('ol li').css('background','white').eq(index).css('background','black').parent().children('#n').text((index+1) + ' / 5')
        },function(){
            that.play()
        })
    }
    this.hover()
    this.next()
    this.play()
    this.pre()
}
$('#autoshow').autoShow()

//  以上轮播图结束  下面为悬停图片时候 a带下划线
    $('main .ditu img,main .ditu a').hover(function(){
        console.log($(this).parent('div'))
        $(this).parent().parent().find('a').css('text-decoration','underline')
    },function(){
         $(this).parent().parent().find('a').css('text-decoration','none')
    })


// 顶部滚动导航
function playTop(){
    var scrollTop = $(window).scrollTop()
    if(scrollTop > 30){
        $('article').css('display','block')
    }else{
        $('article').css('display','none')
    }
}
setInterval(playTop,10)
// 点击箭头滚动缩小窗口滚动距离
$('#top').click(function(){
    var clickTop = $(window).scrollTop()
    function ing(){
        clickTop -= 10
        if(clickTop < 1){
            clickTop = 0
            clearInterval(aa)
        }
        $(window).scrollTop(clickTop)
        
    }
    var aa = setInterval(ing,1)
    // var aa = requestAnimationFrame(ing,10)
})
// 底部
$('#close').click(function(){
    $('main .dibu').css('display','none')
})
// 底部文字悬停
$('footer .gray .dis').children().hover(function(){
    $(this).css('color','white')
},function(){
    $(this).css('color','#C0C0C0')
})
// 底部框悬停
$('footer .gray .border').hover(function(){
    $(this).css('background','white').children().css('color','black')
    
},function(){
    $(this).css('background','#2B2B2B').children().css('color','white')
})


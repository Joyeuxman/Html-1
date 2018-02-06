
$(function () {
    var Initials = $('.initials');
    var LetterBox = $('#letter');

    initials();

    Initials.find('ul')
    .append('<li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li>' +
    '<li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li>' +
    '<li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li>' +
    '<li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li><li>#</li>');

    $(".initials ul li").click(function () {
        // 点击时字母出现
        var _this = $(this);
        var LetterHtml = _this.html();
        LetterBox.html(LetterHtml).fadeIn();
        // 背景颜色变化
        Initials.css('background', 'rgba(145,145,145,0.6)');
        // 过一秒背景颜色变化，字母消失
        setTimeout(function () {
            Initials.css('background', 'rgba(145,145,145,0)');
            LetterBox.fadeOut();
        }, 1000);

        var _index = _this.index()
        //  console.log(_index)
        //点击第一个滚到顶部 
        if (_index == 0) {
            $('html,body').animate({ scrollTop: '0px' }, 300);

        } else if (_index == 27) {
            var DefaultTop = $('#default').position().top;
            $('html,body').animate({ scrollTop: DefaultTop + 'px' }, 300);//点击最后一个滚到#号
            // 这个一般是封装通用方法的时候用，比如 操作多个id的时候可以先封装一个方法然后把id传进来。
        } else {
            var letter = _this.text();
            if ($('#' + letter).length > 0) {
                // console.log($('#' + letter))
                // console.log($('#' + letter).length)
                // 如果在列表中有以该字母开头的城市，则其length为1.否则其length为0
                //position() 方法返回匹配元素相对于父元素的位置（偏移）。
                //该方法返回的对象包含两个整型属性：top 和 left，以像素计
                var LetterTop = $('#' + letter).position().top;
                // console.log($('#' + letter).position())
                $('html,body').animate({ scrollTop: LetterTop - 45 + 'px' }, 300);
            }
        }
    })

    var windowHeight = $(window).height();
    var InitHeight = windowHeight - 45;
    Initials.height(InitHeight);
    var LiHeight = InitHeight / 28;
    Initials.find('li').height(LiHeight);
})


//公众号排序
function initials() {

    var SortList = $(".sort_list");
    console.log(SortList)
    var SortBox = $(".sort_box");

    //比较函数
    function asc_sort(a, b) {

        // console.log($(b).find('.num_name').text().charAt(0))
        // 得到城市的首字符
        // console.log($(a).find('.num_name').text().charAt(0))
        // console.log(makePy($(b).find('.num_name').text().charAt(0))[0])
        // 得到首字符的第一个英文字母

        return makePy($(b).find('.num_name').text().charAt(0))[0]
        .toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
    }

    //进行排序
    // //按首字母排序
    SortList.sort(asc_sort)
    // sort() 方法用于对数组的元素进行排序。
    // arrayObject.sort(sortby)；参数sortby可选。规定排序顺序。必须是函数。该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字

    var initials = [];
    // 建立一个空数组

    var num = 0;
    SortList.each(function (i) {
        var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
        // console.log(initial)

        if (initial >= 'A' && initial <= 'Z') {
            if (initials.indexOf(initial) === -1)
                initials.push(initial);
            // 如果数组中还没有此大写字母，就把它放进该数组
        } else {
            num++;
        }

    });

    // 给每个大写字母添加div标签，id值为，本标签的大写字母
    $.each(initials, function (index, value) {//添加首字母标签
        SortBox.append('<div class="sort_letter" id="' + value + '">' + value + '</div>');
    });

    // 添加#号标签，id为default
    if (num != 0) {
        SortBox.append('<div class="sort_letter" id="default">#</div>');
    }

    //插入到对应的首字母后面
    $('#A').after(SortList.eq(i));

    for (var i = 0; i < SortList.length; i++) {
        var letter = makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
        switch (letter) {
            case "A":
                $('#A').after(SortList.eq(i));
                break;
            case "B":
                $('#B').after(SortList.eq(i));
                break;
            case "C":
                $('#C').after(SortList.eq(i));
                break;
            case "D":
                $('#D').after(SortList.eq(i));
                break;
            case "E":
                $('#E').after(SortList.eq(i));
                break;
            case "F":
                $('#F').after(SortList.eq(i));
                break;
            case "G":
                $('#G').after(SortList.eq(i));
                break;
            case "H":
                $('#H').after(SortList.eq(i));
                break;
            case "I":
                $('#I').after(SortList.eq(i));
                break;
            case "J":
                $('#J').after(SortList.eq(i));
                break;
            case "K":
                $('#K').after(SortList.eq(i));
                break;
            case "L":
                $('#L').after(SortList.eq(i));
                break;
            case "M":
                $('#M').after(SortList.eq(i));
                break;
            case "N":
                $('#N').after(SortList.eq(i));
                break;
            case "O":
                $('#O').after(SortList.eq(i));
                break;
            case "P":
                $('#P').after(SortList.eq(i));
                break;
            case "Q":
                $('#Q').after(SortList.eq(i));
                break;
            case "R":
                $('#R').after(SortList.eq(i));
                break;
            case "S":
                $('#S').after(SortList.eq(i));
                break;
            case "T":
                $('#T').after(SortList.eq(i));
                break;
            case "U":
                $('#U').after(SortList.eq(i));
                break;
            case "V":
                $('#V').after(SortList.eq(i));
                break;
            case "W":
                $('#W').after(SortList.eq(i));
                break;
            case "X":
                $('#X').after(SortList.eq(i));
                break;
            case "Y":
                $('#Y').after(SortList.eq(i));
                break;
            case "Z":
                $('#Z').after(SortList.eq(i));
                break;
            default:
                $('#default').after(SortList.eq(i));
                break;
        }
    };
}


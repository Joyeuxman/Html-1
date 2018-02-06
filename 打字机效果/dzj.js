      $(function() {
          $('.aaa').hide();
          // trim() 去掉字符串起始和结尾的空格
          var a = $('.aaa').text().trim().length;//长度
          var b = $('.aaa').text().trim()//文本
          var c = []
          for (var i = 0; i < a; i++) {
            //   substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符
              c[i] = b.substr(i, 1);//一次只出现一个字符
          }
          console.log(c)
          var d = 0;

         // 进行判断是否全部加载完
          function xiezi() {
              if (d < a) {
                  $('.bbb').append(c[d])
                  d++

              } else {
                  //clearInterval(e)
                  $('.bbb').html('')
                  d = 0
              }
          }

          var e = 0
        //   点击$('.btn1')的次数
          $('.btn1').click(function() {
              clearInterval(e)
              console.log(e)
              e = setInterval(xiezi, 100)
          })
          $('.btn2').click(function() {
            //停止
              clearInterval(e)
          })


      })

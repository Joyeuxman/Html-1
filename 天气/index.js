$.get({
    url: 'http://api.map.baidu.com/telematics/v3/weather',
    dataType: 'jsonp',
    data: {
        location: '郑州市',
        output: 'json',
        ak: 'iw5m2G7ayDow8ofDdDGVUMB3',
        mcode: 'com.BaiduWeather'
    }
}).done(function (data) {
console.log(data)
        

        var r = data.results[0]
        var city = r.currentCity
        var pm25 = r.pm25

        var datas = r.weather_data
        var today = datas[0]
        var pic = today.dayPictureUrl.substring(today.dayPictureUrl.lastIndexOf('/'))

        $('header').text(city)
        $('main .icon').css('background-image', 'url(days' + pic + ')')

        var tempers = today.temperature.replace('℃', '')
        $('main .tempers span').text(tempers)

        $('main .weather').text(today.weather)
        $('main .wind').text(today.wind)

        var temper = today.date.substring(today.date.indexOf('：'))
        temper = temper.replace(')', '')
  

        var current = '实时温度' + temper + '，空气指数 ' + pm25 + ' ' + getAPIName(pm25)
        $('main .current').text(current)

        var days = $('section')

        for (var i = 1; i < 4; i++) {
            var day = days.get(i - 1)
            var data = datas[i]

            $('.week', day).text(data.date)
            $('.temper', day).text(data.temperature)
            $('.wind', day).text(data.wind)
            $('.weather', day).text(data.weather)

            var pic = data.dayPictureUrl.substring(data.dayPictureUrl.lastIndexOf('/'))
            $('.icon', day).css('background-image', 'url(days' + pic + ')')
        }
    }
)

function getAPIName(pm25) {
    if (pm25 <= 50)  return '优'
    if (pm25 <= 100) return '良'
    if (pm25 <= 150) return '轻微污染'
    if (pm25 <= 200) return '轻度污染'
    if (pm25 <= 300) return '中度污染'
    if (pm25 > 300)  return '重度污染'
    if (pm25 > 500)  return '已爆表！'
}

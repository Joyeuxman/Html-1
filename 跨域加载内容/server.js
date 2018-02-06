const exp = require('express'),
    cheerio = require('cheerio'),
    request = require('superagent'),
//   http = require('http'),
app = exp();

app.use(exp.static("www"));

app.get('/agent/qsbk', (req, res) => {
    var html = ''

// 为了让桌面网页更好的适配较老的浏览器，需要添加以下meta标签
// <meta http-equiv="X-UA-Compatible" content="chrome=1,IE=edge">
// <meta name="renderer" content="webkit"/>
// <meta name="applicable-device" content="pc">

    request
        .get('http://www.qiushibaike.com')
        // .send({ name: 'Manny', species: 'cat' })
        // .set('X-API-Key', 'foobar')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0')
        .end(function (err, re) {
            if(err){
                res.json({code:'error',message:'服务端错误，请稍后再试'})
            }else{

                let $ = cheerio.load(re.text)
                let result = $('#content-left .article').toArray()
                // result = result.find('.article').text()
                // result = Array.from(result)
                result = result.map((ele,index)=>{
                    let $ele = $(ele)
                    let author = $ele.find('h2').text()
                    let authorPhoto = $ele.find('.author img').attr('src')
                    let content = $ele.find('.content').text()
                    let votes = $ele.find('.stats-votes .number').text()
                    let comments = $ele.find('.stats-comments .number').text()
                    

                    return {author,authorPhoto,content,votes,comments}
                    
                    
                })

                res.json(result)
                // res.send(re.text)
                // console.log(re)
            }
        });





    // http.request('http://www.qiushibaike.com/8hr/page/2/',resp=>{
    //     resp.on('data',data =>{
    //         html += data
    //     })
    //     resp.on('end',() =>{
    //         res.send(html)
    //     })
    // }).end()
})
app.listen(3002, () => console.log('fly...'))

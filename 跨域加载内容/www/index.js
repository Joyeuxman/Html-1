var xhr = new XMLHttpRequest();

xhr.open('GET','/agent/qsbk')
xhr.send()

xhr.onload = function(){
    // console.log(xhr.responseText)
    var data = JSON.parse(xhr.responseText)
    var html = '<h1> 糗事百科 </h1>'
    data.forEach(function(item,index){
        html += '<section >'
        html += '<h3 >' + item.author + '</h3>'
        html += '< p>'+ item.content + '</p>'
        html += '< p>好笑' +  item.votes + ' ,评论 ' + item.comments + '</p>'
        html += '</section >'

        document.querySelector('.lgh').innerHTML = html
        
        

    })
}
$(document).ready(function () {
    // 创建两个变量的名称数组的月和日
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    // 创建一个newDate()对象
    var date = new Date();
    // 提取日期对象的当前日期
    // setDate(day) 方法用于设置一个月的某一天。参数day 必需 表示一个月中的一天的一个数值（1 ~ 31）。
    date.setDate(date.getDate());
    // 输出的一天,日、月、年   
    // getDay() 方法可返回表示星期的某一天的数字,使用本地时间。返回值是 0（周日） 到 6（周六） 之间的一个整数。
    // getDate() 方法可返回月份的某一天,使用本地时间。返回值是 1 ~ 31 之间的一个整数。
    // getMonth()使用本地时间,返回值是 0（一月） 到 11（十二月） 之间的一个整数。
    // getFullYear() 方法可返回一个表示年份的 4 位数字
    $('#Date').html(dayNames[date.getDay()] + " " + date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear());

    // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式
    setInterval(function () {
        // 创建一个newDate()对象和提取的秒在游客的当前时间
        var seconds = new Date().getSeconds();
        // 添加一个前导零秒值
        // 前导零 是一种 显示数字前面的0的一种格式，这样 的好处是 格式对齐，会更好记录和排序
        // (seconds < 10 ? "0" : "") + seconds括号里
        // 当seconds < 10时,括号里式子的结果为":0"
       // 当seconds >=10时,括号里式子的结果为 " "
        $("#sec").html((seconds < 10 ? "0" : "") + seconds);
    }, 1000);

    setInterval(function () {
        // 创建一个newDate()对象和提取当前时间的分钟
        var minutes = new Date().getMinutes();
        // 添加一个前导零分钟值
        $("#min").html((minutes < 10 ? "0" : "") + minutes);
    }, 1000);

    setInterval(function () {
        var hours = new Date().getHours();
        // 添加一个前导零的时间
        $("#hours").html((hours < 10 ? "0" : "") + hours);
    }, 1000);

}); 
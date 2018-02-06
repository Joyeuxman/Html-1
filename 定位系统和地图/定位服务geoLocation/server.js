var express = require("express");

var app = express();

app.use(express.static("wwwroot"));

app.listen(8080,function(){
	console.log("服务器已开启");
});

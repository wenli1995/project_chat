//let ioServer=require('socket.io')(9001);  //监听9001端口的http服务器
var app_express = require('express')();
var http = require('http').createServer(app_express);
var ioServer = require('socket.io')(http);

app_express.get('/', function(req, res){
    res.sendFile(__dirname + '/home.html');
});


ioServer.on("close",function(){
    console.log("ioServer is closing");
})
ioServer.on("error",function(err){
    console.log("ioServer occurs error:"+err);
})


ioServer.on('connection', function(socket) {
    //socket是Socket引擎，参考Socket API https://socket.io/docs/server-api/#Socket
    console.log('a user connected');
    socket.on('disconnect', (reason) => {
        console.log("user disconnected:" + reason);
    });
    socket.on("ask",function(message){
        console.log("ioServer receive message:"+message);
        ioServer.emit("ask",message);  //注意这里的ioServer的emit方法，而不是socket的，否则就是一对一了
    })
})

http.listen(3001,function(){
    console.log('listening on *:3001');
});

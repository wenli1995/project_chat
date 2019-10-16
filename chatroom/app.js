/**
 * @author wenlichen
 * @date 2019-10-15 17:18
 */

//let ioServer=require('socket.io')(9001);  //监听9001端口的http服务器
var express=require('express')
var app = express();
var http = require('http').createServer(app);
var ioServer = require('socket.io')(http);
var bodyParser = require('body-parser')

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/login.html');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })  //必须对请求体参数进行解析
app.post('/home', urlencodedParser,function(req, res){
    res.sendFile(__dirname + '/public/home.html');
});


var userList=[];//保存所有登录用户
var usersockets={}; //保存所有登录用户的socket信息,记录格式{username:socket}
//socket是Socket引擎，参考Socket API https://socket.io/docs/server-api/#Socket
ioServer.on('connection', function(socket) {
    console.log('a user connected');

    //监听用户登入事件
    socket.on("userLogin",function(username){
        socket.username=username;  //每个连接对应一个用户，所以将用户信息保存于此，以在断开连接时访问用户名
        userList.push(socket.username);   //经元素保存在元素列表
        if(!usersockets[username]){
            usersockets[username]=socket;
        }
        console.log("userList:"+userList);
        console.log("usersockets after login:"+Object.keys(usersockets));
        ioServer.emit("login",{
            //通知所有用户有用户登入
            username:socket.username,
            message:" joined",
            userList:userList
        });
    })
    //监听用户离开事件
    socket.on('disconnect', (reason) => {
        console.log("user disconnected:" + reason);
        if(usersockets[socket.username]){
            delete(usersockets[socket.username]);
        }
        console.log("usersockets after logout:"+Object.keys(usersockets));
        var index=userList.indexOf(socket.username);
        userList.splice(index,1);
        console.log("userList after logout:"+userList);
        //通知所有用户有用户退出
        ioServer.emit("logout",{
            username:socket.username,
            message:" left",
            userList:userList
        });
    });
    //监听客户端发送消息事件
    socket.on("chat message",function(message){

        console.log("ioServer receive message:"+message);
        //将接收到的消息发送给除发送者自身的所有客户端
        socket.broadcast.emit("chat message",{
            username:socket.username,
            message:message
        });

    })
    //监听客户端发送私密消息事件
    socket.on("private message",function(msg){
        console.log("ioServer receive private message:"+msg.message);
        //将消息发回对方
        console.log("recipientmsg:"+msg["recipient"]);
        //console.log("recipientSocketmsg:"+usersockets[msg.recipient]);
        var recipientSocket=usersockets[msg.recipient];
        console.log("recipientSocket:"+recipientSocket);
        recipientSocket.emit("private message",{
            username:socket.username,
            message:msg.message
        });
    })
})

app.use("/public",express.static("public"));

http.listen(3000,function(){
    console.log('listening on *:3000');
});

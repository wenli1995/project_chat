一、项目名称：聊天室(chatroom)

二、文件夹简述
webSocket_demo：学习webSocket协议实现聊天室demo
socketIO_demo：学习socketIO实现聊天室demo
chatroom:聊天室项目文件夹

三、技术栈：
前端：Bootstrap+jquery
后端：Nodejs，Express框架，socketio
{
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "socket.io": "^2.3.0"
  }
}

四、使用说明
打开cmd命令行工具，进入chatroom文件夹
1、输入cnpm install安装所有依赖包；
2、输入node app.js，运行后台代码
3、浏览器访问localhost:3000,随意输入一个用户名A登录聊天室,
新开浏览器窗口，访问localhost:3000，输入另一个用户名B登录,
A和B则可以在聊天室聊天了

五、功能简介
1、用户登录功能
2、向所有在线用户广播用户登录和用户退出消息
3、展示所有在线用户
4、发送公共消息（群聊）功能
5、发送私密消息（私聊）功能，双击在线用户名称即发送私密消息，消息仅选中用户可见

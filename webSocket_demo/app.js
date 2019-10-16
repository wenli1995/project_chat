let WebSocket=require("ws");
const wsServer=new WebSocket.Server({port:9000});   //创建一个webSocket服务器，其实质是一个事件分发器
/*服务端可监听的事件
Event: 'close'
Event: 'connection'
Event: 'error'
Event: 'headers'
Event: 'listening'
*/

wsServer.on("close",function(){
    console.log("WebSocketServer is closing");
})
wsServer.on("error",function(err){
    console.log("WebSocketServer occurs error:"+err);
})

wsServer.on("connection",function(websocket){
    console.log("已建立websocket连接")
    //websocket是一个WebSocket对象,可以看作网络传输管道
    /*1、将消息发送给发送者
      websocket.onmessage=function(message){
        //An event listener to be called when a message is received from the server. The listener receives a MessageEvent named "message".
        console.log("WebSocketServer receive message:"+message.data);
        //API文档：https://github.com/websockets/ws/blob/HEAD/doc/ws.md#websocketsenddata-options-callback
        let data={name:'Alice',age:20}
        websocket.send(JSON.stringify(data),function(err){
            if(err){
                console.log("向客户端发送消息出现错误:"+err);
            }
        })
      */
    /*2、将消息广播给所有客户端，遍历所有客户端，将消息发送到各个客户端*/
    websocket.onmessage=function(message){
        let clients=wsServer.clients;  //返回所有客户端集合
        clients.forEach(function(client){
            client.send("Server:"+message.data);
        })
    }

})

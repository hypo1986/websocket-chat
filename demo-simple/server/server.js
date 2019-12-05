var express = require('express');
var http = require('http');
var WebSocket = require('ws');

var app = express();
app.use(express.static(__dirname));
app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});

var server = http.createServer(app);
var wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
    console.log('链接成功！');
    ws.on('message', function incoming(data) {
        /**
         * 把消息发送到所有的客户端
         * wss.clients获取所有链接的客户端
         */
        console.log(wss.clients,'99999')
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    });
});

server.listen(8181, function listening() {
    console.log('服务器启动成功！');
});
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs')
var path = '/home/mayank/Desktop/a/AutoMate'
var exec = require('child_process').exec;



app.use(express.static(__dirname + '/client'));
app.use('/client', express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client', 'index.html'));
});


io.on('connection', function(socket) {
    console.log("New User Connected");

    fs.readdir(path, function(err, items) {

        for (var i=0; i<items.length; i++) {
            console.log(items[i]);
            socket.emit('new-song', items[i]);
        }
    });

    socket.on('vid-link', function(msg) {
        
        console.log('message: ' + msg);
	    fs.appendFile('links.txt', msg + '\n')

    });

    socket.on('download', function(msg) {
	console.log('command: ' + msg);
        exec('mkdir new');
	exec('python /home/pi/Desktop/webapp/v4/ytdownload.py');


    });
});




http.listen(3000, function(){
    console.log('Web server Active listening on *:3000');
});
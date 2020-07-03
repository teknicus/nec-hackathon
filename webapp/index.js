var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var path = require('path');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var str = "undefined";
const { convertCSVToArray } = require('convert-csv-to-array');
const converter = require('convert-csv-to-array');


app.use(express.static(__dirname + '/client'));
app.use('/client', express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname + '/client', 'front.html'));
});


io.on('connection', function(socket) {
    console.log("New User Connected");

    socket.on('data', function(msg) {
        console.log('message: ' + msg);
      //  socket.emit('passenger', 'received');
        const arrayofObjects = convertCSVToArray(msg, {
            separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
        });
        var place = arrayofObjects[0][0];
        var time = arrayofObjects[0][1];
        var dist = arrayofObjects[0][2];

        console.log('Place: ' + place);
        console.log('Time: ' + time);
        console.log('Distance: ' + dist);

        var distNum = parseFloat(dist);
        var timeNum = parseInt(time);

        MongoClient.connect(url, function(err, db) {
            //if (err) throw err;
            var dbo = db.db("automate");
            var myquery = { distance: { $lt: distNum } };
            dbo.collection(place).find(myquery, { projection: {  _id:0, dpoint: 1 } }).toArray(function(err, result) {
                console.log(result);
             //   if (err) throw err;
            var i=0;
                for(i=0;i<result.length;i++){
                    //if (err) break;
                    var query = { dpoint: result[i].dpoint };
                    //console.log('loop0');
                    dbo.collection("passengers").find(query, { projection: { _id: 0, fname: 1, dpoint: 1, operator: 1, vehnum: 1, fdes:1, atime: 1 } }).toArray(function(err, result) {
                        if (err) throw err;
                        for(i=0;i<result.length;i++){ //console.log('loop1');
                            if((result[i].atime > timeNum) && (result[i].atime <= (timeNum + 200))){
                                str = result[i].fname;
                                str = str.concat(" will arrive at ", result[i].dpoint, " on ", result[i].operator, " - ", result[i].vehnum, " at ", result[i].atime );
                                console.log(str);
                                socket.emit('passenger', str);
                            }
                        }

                        db.close();
                    });



                }

                //console.log("break");
                //console.log(result[2].dpoint);
                //console.log(result[3].dpoint);

                //console.log(result);
                db.close();
            });
        });

    });
    socket.on('register', function(msg) {
        console.log(msg);

        const arrayofObjects = convertCSVToArray(msg, {
            separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
        });

        var dname = arrayofObjects[0][0];
        var dphno = arrayofObjects[0][1];
        var dlino = arrayofObjects[0][2];
        var didp = arrayofObjects[0][3];
        var duname = arrayofObjects[0][4];
        var dpass = arrayofObjects[0][5];

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("automate");
            var myobj = { name: dname, phno: dphno, lino: dlino, idp: didp, uname: duname, pass: dpass };
            dbo.collection("drivers").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    });

    socket.on('login', function(msg) {
        console.log(msg);

        const arrayofObjects = convertCSVToArray(msg, {
            separator: ',', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
        });

        var euname = arrayofObjects[0][0];

        var epass = arrayofObjects[0][1];
        console.log(euname);
        console.log(epass);

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("automate");
            var query = { uname: euname, pass: epass };
            dbo.collection("drivers").find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                if(result.length>0) {
                    socket.emit('login_success', "success");
                    console.log("success");
                }
                db.close();
            });
        });
    });
   // socket.emit('passenger', "str");

});



http.listen(3000, function(){
    console.log('Web server Active listening on *:3000');
});
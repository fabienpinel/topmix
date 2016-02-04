var express = require('express');
var app = express();
var router = require('./libs/router')(express.Router());
var bodyParser = require('body-parser');
var cors = require('cors');
var authenticate = require('./libs/router/authentication-middleware');
var expressValidator = require('express-validator');
var db = require('./libs/database');

app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use(authenticate);
app.use('/',router);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,sessionid');
    next();
});

var server = app.listen(7070, function () {
    console.log("Server Launched on port " + server.address().port + "...");
    db
        .init()
        .then(function () {
            console.info('Success created Samples');
            var io = require('socket.io').listen(server);
            var sockets = require('./libs/sockets');
            io.on('connection', sockets.socketCallback);
        })
        .catch(function (err) {
            console.error(err.stack);
            server.close();
        });
});

module.exports = server;
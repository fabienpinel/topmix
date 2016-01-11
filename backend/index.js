var express = require('express');
var app = express();
var router = require('./modules/router')(express.Router());
var bodyParser = require('body-parser');
var cors = require('cors');
var authenticate = require('./modules/router/authentication-middleware');
var expressValidator = require('express-validator');

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
});

module.exports = server;
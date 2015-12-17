var express = require('express');
var app = express();
var router = require('./modules/router')(express.Router());
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/',router);


var server = app.listen(7070, function () {
    console.log("Server Launched on port " + server.address().port + "...");
});

module.exports = server;
var MongoClient = require('mongodb').MongoClient;

module.exports = {
    connect: function () {
        return new Promise(function (resolve) {
            MongoClient.connect('mongodb://localhost:27017/topmix', function(err, db) {
                var users = db.collection('users');
                users.createIndex({username: 1}, {unique: true}, function () {
                    return resolve(db);
                });
            });
        });
    }
};
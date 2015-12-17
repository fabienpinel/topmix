var assert = require('assert');
var callbacks = require('../modules/callbacks');
var request = require('supertest');
var database = require('../modules/database');

describe('Callbacks Tests', function () {

    var user = {
        username: 'username',
        password: 'password'
    };

    var server;
    before(function () {
        server = require('../');
    });
    after(function (done) {
        database
            .connect()
            .then(function (db) {
                var users = db.collection('users');
                users.remove({username: user.username}, function (err, response) {
                    assert.equal(1, response.result.n);
                    server.close(done);
                });
            })
            .catch(function (err) {
                console.log('ERROR', err);
            });

    });

    describe('Create User', function () {
        it ('Should Create a user', function (done) {
            request(server)
                .post('/users')
                .send(user)
                .set('Accept', 'application/json')
                .end(function(err, res){
                    assert.equal(201, res.status);
                    done();
                });
        });

        it ('Should Fail when Create a user with same username', function (done) {
            request(server)
                .post('/users')
                .send(user)
                .set('Accept', 'application/json')
                .end(function(err, res){
                    assert.equal(500, res.status);
                    assert.equal(res.body.errmsg, 'E11000 duplicate key error index: topmix.users.$username_1 dup key: { : "username" }')
                    done();
                });
        });
    });

});
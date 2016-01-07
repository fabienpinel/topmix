var assert = require('assert');
var callbacks = require('../modules/callbacks');
var request = require('supertest');
var database = require('../modules/database');

describe('Callbacks Tests', function () {

    var user = {
        username: 'username',
        password: 'password'
    };

    var mix = {
        name: 'mix 1'
    };

    var track = {
        name: 'piste 1'
    };

    var sessionId = null;

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

    describe('Post /api/users', function () {
        it ('Should Create a user', function (done) {
            request(server)
                .post('/api/users')
                .send(user)
                .set('Accept', 'application/json')
                .end(function(err, res){
                    assert.equal(201, res.status);
                    done();
                });
        });

        it ('Should Fail when Create a user with same username', function (done) {
            request(server)
                .post('/api/users')
                .send(user)
                .set('Accept', 'application/json')
                .end(function(err, res){
                    assert.equal(500, res.status);
                    assert(res.body.errmsg.indexOf('E11000 duplicate key error index: topmix.users.$username_1') >= 0);
                    done();
                });
        });
    });

    describe('Post /api/sessions', function () {
        it ('Should Create a sessionId for the user', function (done) {
            request(server)
                .post('/api/sessions')
                .send(user)
                .set('Accept', 'application/json')
                .end(function(err, res){
                    sessionId = res.body;
                    assert.equal(201, res.status);
                    done();
                });
        });

        it ('Should Create a sessionId for the user', function (done) {
            request(server)
                .post('/api/sessions')
                .send({
                    username: 'coucou',
                    password: 'password'
                })
                .set('Accept', 'application/json')
                .end(function(err, res){
                    assert.equal(403, res.status);
                    done();
                });
        });
    });

    describe('Post /api/mixes', function () {
        it ('Should Create a user\'s Mix', function (done) {
            request(server)
                .post('/api/mixes')
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .send({name: mix.name})
                .end(function(err, res) {
                    mix = res.body;
                    assert.equal(201, res.status);
                    done();
                });
        });
    });

    describe('Update /api/mixes/:id', function () {
        it ('Should Update a user\'s Mix', function (done) {
            request(server)
                .post('/api/mixes/' + mix._id + '/tracks')
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .send({name: track.name})
                .end(function(err, res) {
                    assert.equal(201, res.status);
                    done();
                });
        });
    });

    describe('Get /api/mixes', function () {
        it ('Should Get the mix previously created', function (done) {
            request(server)
                .get('/api/mixes')
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .send({name: mix.name})
                .end(function(err, res) {
                    assert.equal(1, res.body.length);
                    assert.equal(200, res.status);
                    done();
                });
        });
    });

    describe('Delete /api/mixes', function () {
        it ('Should Delete the mix previously created and getted', function (done) {
            request(server)
                .del('/api/mixes/' + mix._id)
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    assert.equal(204, res.status);
                    done();
                });
        });
    });

    describe('Delete /api/sessions', function () {
        it ('Should Delete a sessionId for the user', function (done) {
            request(server)
                .del('/api/sessions')
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .end(function(err, res){
                    assert.equal(204, res.status);
                    done();
                });
        });
        it ('Should not Delete a sessionId for the user because already done', function (done) {
            request(server)
                .del('/api/sessions')
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .end(function(err, res){
                    assert.equal(403, res.status);
                    done();
                });
        });
    });

});
var assert = require('assert');
var callbacks = require('../modules/callbacks');
var request = require('supertest');
var database = require('../modules/database');

describe('Callbacks Tests', function () {

    var user = {
        username: 'usernamefoerjoeropoepegoejgegiouernîujbgvidfujn',
        password: 'password'
    };

    var mix = {
        name: 'mix 1'
    };

    var track = {
        _id: null,
        name: 'piste 1'
    };

    var insertSampleId = 17;

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

        it ('Should fail when create a user because username and password < 6 char', function () {
            request(server)
                .post('/api/users')
                .send({
                    username:'user',
                    password: 'pass'
                })
                .set('Accept', 'application/json')
                .end(function(err, res){
                    assert.equal(2, res.body.length); // number of errors
                    assert.equal(400, res.status);
                    done();
                });
        });

        it ('Shoud fail when create a user because missing password field', function () {
            request(server)
                .post('/api/users')
                .send({
                    username:'username2'
                })
                .set('Accept', 'application/json')
                .end(function(err, res){
                    assert.equal(1, res.body.length); // number of errors
                    assert.equal(400, res.status);
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
                    assert(res.body.errmsg.indexOf('E11000 duplicate key error index: topmix.users') >= 0);
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

        it ('Should not Create a sessionId for the user', function (done) {
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

    describe('Post /api/mixes/:id/tracks', function () {
        it ('Should Update a user\'s Mix', function (done) {
            request(server)
                .post('/api/mixes/' + mix._id + '/tracks')
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .send({name: track.name})
                .end(function(err, res) {
                    track._id = res.body;
                    assert.equal(201, res.status);
                    done();
                });
        });
    });

    describe('Put /api/mixes/:id/tracks/:id', function () {
        it ('Should Update a user\'s Track', function (done) {
            request(server)
                .put('/api/mixes/' + mix._id + '/tracks/' + track._id)
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .send({name: 'gorge', volume: 0})
                .end(function(err, res) {
                    track.name = 'gorge';
                    track.volume = 0;
                    assert.equal(200, res.status);
                    done();
                });
        });
    });

    describe('Post /api/mixes/:id/tracks/:id/samples', function () {
        it ('Should add a sample to the previous updated track', function (done) {
            request(server)
                .post('/api/mixes/' + mix._id + '/tracks/' + track._id + '/samples')
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .send({index: insertSampleId, _id: 'bonjourjesuisunsample'})
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
                    assert.equal(insertSampleId + 1, res.body[0].tracks[0].samples.length);
                    done();
                });
        });
    });

    describe('Delete /api/mixes/:id/tracks/:id/samples/:index', function () {
        it ('Delete the previous sample inserted on the track', function (done) {
            request(server)
                .del('/api/mixes/' + mix._id + '/tracks/' + track._id + '/samples/' + insertSampleId)
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    assert.equal(204, res.status);
                    done();
                });
        });
    });

    describe('Delete /api/mixes/:id/tracks/:id', function () {
        it ('Should Delete a user\'s Track', function (done) {
            request(server)
                .delete('/api/mixes/' + mix._id + '/tracks/' + track._id)
                .set('sessionid', sessionId)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    assert.equal(204, res.status);
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
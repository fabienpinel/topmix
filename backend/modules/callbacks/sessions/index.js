var database = require('../../database');
var uuid = require('node-uuid');

module.exports = {
    postSessions: function (req, res) {
        database
            .connect()
            .then(function (db) {
                var users = db.collection('users');
                var sessionId = uuid.v4();
                users
                    .update(
                        {
                            username: req.body.username,
                            password: req.body.password
                        },
                        {
                            $set: {sessionId: sessionId}
                        }, function (err, result) {
                            if (err) { return res.status(500).json(err); }
                            else {
                                if (result.result.nModified === 1) {
                                    return res.status(201).json(sessionId);
                                } else {
                                    return res.status(403).end();
                                }

                            }
                        }
                    );
            })
            .catch(function (error) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    },
    deleteSessions: function (req, res) {
        database
            .connect()
            .then(function (db) {
                var users = db.collection('users');
                users
                    .update(
                        {
                            sessionId: req.headers.sessionid
                        },
                        {
                            $set: {sessionId: null}
                        }, function (err, result) {
                            if (err) { return res.status(500).json(err); }
                            else {
                                if (result.result.nModified === 1) {
                                    return res.status(204).end();
                                } else {
                                    return res.status(403).end();
                                }

                            }
                        }
                    );
            })
            .catch(function (error) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    }
};
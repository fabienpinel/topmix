var database = require('../../database');
var uuid = require('node-uuid');

module.exports = {

    /**
     * Verify that the session has not expired
     *
     * @param req
     * @param res
     */
    getSessions: function (req, res) {
        return res.status(200).end();
    },

    /**
     * user query a session eg LOGIN
     *
     * @param req
     * @param res
     */
    postSessions: function (req, res) {

        req.checkBody({
            'username': {
                notEmpty: true,
                isLength: {
                    options: [6, 256]
                },
                errorMessage: 'Field "username" must be at least 6 char'
            },
            'password': {
                notEmpty: true,
                isLength: {
                    options: [6, 256]
                },
                errorMessage: 'field "password" must be at least 6 char'
            }
        });

        var errors = req.validationErrors();
        if (errors) return res.status(400).json(errors);

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
                                if (result.result.n === 1) {
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

    /**
     * User delete its own session eg LOGOUT
     *
     * @param req
     * @param res
     */
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
                                if (result.result.n === 1) {
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
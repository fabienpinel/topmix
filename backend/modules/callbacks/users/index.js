var database = require('../../database');

module.exports = {
    createUser: function (req, res) {
        database
            .connect()
            .then(function (db) {
                var users = db.collection('users');
                users
                    .insert({
                        username: req.body.username,
                        password: req.body.password,
                        mixId: [],
                        mixCount: 0,
                        sessionId: null
                    }, function (err) {
                        if (err) { return res.status(500).json(err); }
                        else {
                            return res.status(201).end();
                        }
                    });

            })
            .catch(function (error) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    }
};
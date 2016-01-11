var database = require('../../database');

module.exports = {
    /**
     * User creation eg SIGNIN
     *
     * @param req
     * @param res
     */
    postUsers: function (req, res) {

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
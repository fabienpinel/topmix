var database = require('../database');

module.exports = function (req, res, next) {
    if ( (req.url.indexOf('/api/users') >= 0 && req.method == 'POST')
        || (
            req.url.indexOf('/api/sessions') >= 0 && req.method == 'POST'
        )) {
        next();
    } else {
        database
            .connect()
            .then(function (db) {
                var users = db.collection('users');
                users
                    .find({ sessionId: req.headers.sessionid })
                    .toArray(function (err, users) {
                            if (err) { return res.status(500).json(err); }
                            else {
                                if (users.length === 1) {
                                    req.user = users[0];
                                    next();
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
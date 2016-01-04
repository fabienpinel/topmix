var database = require('../../database');
var uuid = require('node-uuid');

module.exports = {

    getMixes: function (req, res) {
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('mixes');
                mixes
                    .find({ userId: req.user._id })
                    .toArray(function (err, docs) {
                        if (err) { return res.status(500).json(err); }
                        else {
                            return res.status(200).json([docs]);
                        }
                    });
            })
            .catch(function (error) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    },

    postMixes: function (req, res) {
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('mixes');
                mixes
                    .insert(
                        {
                            name: req.body.name,
                            userId: [req.user._id],
                            tracks: []
                        }, function (err, result) {
                            if (err) { return res.status(500).json(err); }
                            else {
                                if (result.ops.length === 1) return res.status(201).json(result.ops[0]);
                                else return res.status(500).json(err);
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
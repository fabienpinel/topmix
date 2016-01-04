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
    },
    getOneMixes : function(req, res) {
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('mixes');
                mixes
                    .find({
                        userId: req.user._id,
                        _id: req.params.idMixes
                    })
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
    deleteOneMixes : function(req, res) {
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('mixes');
                mixes
                    .delete({
                        userId: req.user._id,
                        _id: req.params.idMixes
                    }, function (err, result) {
                        if (err) { return res.status(500).json(err); }
                        else {
                            if (result.ops.length === 1) return res.status(201).json(result.ops[0]);
                            else return res.status(403).json(err);
                        }
                    }
                );
            })
            .catch(function (error) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    },
    postTracks : function(req, res) {
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('mixes');
                mixes
                    .findOne({
                        _id: req.params.idMixes
                    })
                    .update(
                    {
                        tracks: []//TODO
                    }, function (err, result) {
                        if (err) { return res.status(500).json(err); }
                        else {
                            //TODO
                        }
                    }
                );
            })
            .catch(function (error) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    },
    putTracks : function(req, res) {
        //TODO
    },
    deleteTracks : function(req, res){
        //TODO
    }
};
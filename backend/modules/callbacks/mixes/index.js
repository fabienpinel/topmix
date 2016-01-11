var database = require('../../database');
var uuid = require('node-uuid');
var ObjectID = require("mongodb").ObjectID;

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
                        _id: ObjectID(req.params.idMixes)
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
                    .remove({
                        userId: req.user._id,
                        _id: ObjectID(req.params.idMixes)
                    }, function (err, result) {
                        if (err) { return res.status(500).json(err); }
                        else {
                            if (result.result.n == 1) return res.status(204).end();
                            else return res.status(403).end();
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
                var id = new ObjectID();
                mixes
                    .update(
                    {
                        userId : req.user._id,
                        _id: ObjectID(req.params.idMixes)
                    },
                    {
                        $push: { tracks: {
                            _id: id,
                            name: req.body.name,
                            volume: 100,
                            samples: []
                        }}
                    }, function (err, result) {
                        if (err) { return res.status(500).json(err); }
                        else {
                            if (result.result.n == 1) return res.status(201).json(id);
                            else return res.status(403).end();
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
        var updateQuery =
            {
                $set : {}
            };
        if (req.body.name) updateQuery.$set['tracks.$.name']=req.body.name;
        if (req.body.volume) updateQuery.$set['tracks.$.volume']=req.body.volume;
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('mixes');
                mixes
                    .update(
                    {
                        userId : req.user._id,
                        _id : ObjectID(req.params.idMixes),
                        tracks: {$elemMatch :{_id: ObjectID(req.params.idTracks)}}
                    },
                    updateQuery,
                    function (err, result) {
                        if (err) { return res.status(500).json(err); }
                        else {
                            if (result.result.n == 1) return res.status(200).end();
                            else return res.status(403).end();
                        }
                    }
                );
            })
            .catch(function (error) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    },
    deleteTracks : function(req, res){
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('mixes');
                mixes
                    .update(
                    {
                        userId : req.user._id,
                        _id: ObjectID(req.params.idMixes)
                    },
                    {
                        $pull : { tracks : { _id : ObjectID(req.params.idTracks)}}
                    },
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err); }
                        else {
                            if (result.result.n == 1) return res.status(204).end();
                            else return res.status(403).end();
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
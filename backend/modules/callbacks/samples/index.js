var database = require('../../database');
var uuid = require('node-uuid');
var ObjectID = require("mongodb").ObjectID;

module.exports = {
    getSamples: function (req, res) {
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('samples');
                mixes
                    .find({})
                    .toArray(function (err, docs) {
                        if (err) { return res.status(500).json(err); }
                        else {
                            return res.status(200).json(docs);
                        }
                    });
            })
            .catch(function (error) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    },
    postSamples : function (req, res) {
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('samples');
                mixes
                    .find({
                        userId : req.user._id,
                        _id : ObjectID(req.params.idMixes),
                        tracks: {$elemMatch :{_id: ObjectID(req.params.idTracks)}}
                    }).toArray(function (err, docs) {
                        if (err) { return res.status(500).json(err); }
                        else {
                            if (docs.length === 0 || docs[0].tracks.length !== 1) {
                                return res.status(403).end();
                            } else {
                                var samples = docs[0].tracks[0].samples;
                                var index = parseInt(req.body.index);
                                if(samples.length > index){
                                    samples[index] = req.param._id;
                                } else {
                                    for (var i = samples.length; i < index - 1; i++) {
                                        samples.push(null);
                                    }
                                    samples.push(req.param._id);
                                }
                            }
                        }
                    });
            })
            .catch(function (err) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    }
};
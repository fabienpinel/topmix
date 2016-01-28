var database = require('../../database');
var uuid = require('node-uuid');
var ObjectID = require("mongodb").ObjectID;

module.exports = {

    /**
     * Get sample list
     *
     * @param req
     * @param res
     */
    getSamples: function (req, res) {
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('samples');
                mixes
                    .find({})
                    .toArray(function (err, docs) {
                        db.close();
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

    /**
     * add a sample to a track
     *
     * @param req must contains {index, _id}
     * @param res
     */
    postSamples : function (req, res) {
        console.log(req.params, req.body);
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('mixes');
                mixes
                    .find({
                        userId : req.user._id,
                        _id : ObjectID(req.params.idMixes)
                    }).toArray(function (err, docs) {
                        if (err) {
                            db.close();
                            return res.status(500).json(err);
                        }
                        else {
                            if (docs.length === 0 || docs[0].tracks.length === 0) {
                                db.close();
                                return res.status(403).end();
                            } else {

                                // looking for track
                                var samples = null;
                                var trackIndex = 0;
                                for (var i in docs[0].tracks) {
                                    if (docs[0].tracks[i]._id == req.params.idTracks) {
                                        samples = docs[0].tracks[i].samples;
                                        trackIndex = i;
                                        break;
                                    }
                                }

                                if (samples) {
                                    var index = parseInt(req.body.index);
                                    if(samples.length > index){
                                        samples[index] = req.body._id;
                                    } else {
                                        for (var i = samples.length; i < index; i++) {
                                            samples.push(null);
                                        }
                                        samples.push(req.body._id);
                                    }
                                    docs[0].tracks[trackIndex].samples = samples;
                                    mixes.update(
                                        {
                                            userId : req.user._id,
                                            _id : ObjectID(req.params.idMixes)
                                        },
                                        {
                                            $set : {'tracks': docs[0].tracks}
                                        },
                                        function (err, result) {
                                            db.close();
                                            if (err) { return res.status(500).json(err); }
                                            else {
                                                if (result.result.n == 1) return res.status(201).end();
                                                else return res.status(403).end();
                                            }
                                        }
                                    )
                                } else {
                                    res.status(403).end();
                                }


                            }
                        }
                    });
            })
            .catch(function (error) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    },

    /**
     * Delete a sample on a track in a given index
     *
     * @param req
     * @param res
     */
    deleteSamples: function (req, res) {
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('mixes');
                mixes
                    .find({
                        userId : req.user._id,
                        _id : ObjectID(req.params.idMixes),
                        tracks: {$elemMatch :{_id: ObjectID(req.params.idTracks)}}
                    }).toArray(function (err, docs) {
                    if (err) {
                        db.close();
                        return res.status(500).json(err);
                    }
                    else {
                        if (docs.length === 0 || docs[0].tracks.length !== 1) {
                            db.close();
                            return res.status(403).end();
                        } else {
                            var samples = docs[0].tracks[0].samples;
                            var index = parseInt(req.params.idSamples);
                            if (index < samples.length) {
                                samples[index] = req.body._id;
                            } else {
                                return res.status(400).end();
                            }
                            mixes.update(
                                {
                                    userId : req.user._id,
                                    _id : ObjectID(req.params.idMixes),
                                    tracks: {$elemMatch :{_id: ObjectID(req.params.idTracks)}}
                                },
                                {
                                    $set : {'tracks.$.samples': samples}
                                },
                                function (err, result) {
                                    db.close();
                                    if (err) { return res.status(500).json(err); }
                                    else {
                                        if (result.result.n == 1) return res.status(204).end();
                                        else return res.status(403).end();
                                    }
                                }
                            )
                        }
                    }
                });
            })
            .catch(function (error) {
                console.log('unexpected error', error);
                return res.status(500).json(error);
            });
    }
};
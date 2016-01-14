var database = require('../../database');
var ObjectID = require("mongodb").ObjectID;

module.exports = {

    /**
     * Get all the mix of the current user
     *
     * @param req
     * @param res
     */
    getMixes: function (req, res) {
        database
            .connect()
            .then(function (db) {
                var mixes = db.collection('mixes');
                mixes
                    .find({ userId: req.user._id })
                    .toArray(function (err, docs) {
                        db.close();
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

    /**
     * Create a new mix
     *
     * @param req must contains {name}
     * @param res
     */
    postMixes: function (req, res) {

        req.checkBody({
            'name': {
                notEmpty: true,
                errorMessage: 'Field "name" cannot be empty'
            }
        });

        var errors = req.validationErrors();
        if (errors) return res.status(400).json(errors);

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
                            db.close();
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

    /**
     * Get a single mix
     *
     * @param req
     * @param res
     */
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
                        db.close();
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

    /**
     * Delete a mix
     *
     * @param req
     * @param res
     */
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
                        db.close();
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

    /**
     * add a new track
     *
     * @param req must contains {name}
     * @param res
     */
    postTracks : function(req, res) {

        req.checkBody({
            'name': {
                notEmpty: true,
                errorMessage: 'Field "name" cannot be empty'
            }
        });

        var errors = req.validationErrors();
        if (errors) return res.status(400).json(errors);

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
                            db.close();
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

    /**
     * Update track info
     *
     * @param req must contains {name, volume}
     * @param res
     */
    putTracks : function(req, res) {
        var updateQuery = { $set : {} };
        if (req.body.name) {
            req.checkBody('name', 'Invalid name').notEmpty();
            updateQuery.$set['tracks.$.name'] = req.body.name;
        }
        if (req.body.volume) {
            req.checkBody('volume', 'Invalid name').notEmpty().isInt();
            updateQuery.$set['tracks.$.volume'] = req.body.volume;
        }
        var errors = req.validationErrors();
        if (errors) return res.status(400).json(errors);


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
                        db.close();
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

    /**
     * Delete a specific track by id
     *
     * @param req
     * @param res
     */
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
                        db.close();
                        if (err) {
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
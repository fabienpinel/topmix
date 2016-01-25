var MongoClient = require('mongodb').MongoClient;

var samplesDoc = [
    { name: 'VFH2_Cool_Kit_1.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_10.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_11.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_12.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_13.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_14.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_15.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_2.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_3.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_4.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_5.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_6.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_7.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_8.wav', bpm: 128},
    { name: 'VFH2_Cool_Kit_9.wav', bpm: 128},
    { name: 'VFH2_Cool_Melody_1.wav', bpm: 128},
    { name: 'VFH2_Cool_Melody_2.wav', bpm: 128}
];

var database = {
    connect: function () {
        return new Promise(function (resolve) {
            MongoClient.connect('mongodb://localhost:27017/topmix', function(err, db) {
                var users = db.collection('users');
                users.createIndex({username: 1}, {unique: true}, function () {
                    return resolve(db);
                });
            });
        });
    },

    init: function () {
        return new Promise(function (resolve, reject) {
            database
                .connect()
                .then(function (db) {
                    var samples = db.collection('samples');
                    samples
                        .find({})
                        .toArray(function (err, docs) {
                            if (err) return reject(err);
                            if (docs.length === 0) {
                                samples
                                    .insertMany(samplesDoc, function (err, result) {
                                        db.close();
                                        if (err) return reject();
                                        resolve();
                                    });
                            } else {
                                db.close();
                                resolve();
                            }
                        })
                });
        });

    }
};

module.exports = database;
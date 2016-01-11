var usersCB = require('./users');
var sessionsCB = require('./sessions');
var mixesCB = require('./mixes');
var samplesCB = require('./samples');

module.exports = {

    postUsers: usersCB.postUsers,

    postSessions: sessionsCB.postSessions,
    deleteSessions: sessionsCB.deleteSessions,

    getMixes: mixesCB.getMixes,
    postMixes: mixesCB.postMixes,
    getOneMixes: mixesCB.getOneMixes,
    deleteMixes: mixesCB.deleteOneMixes,
    postTracks: mixesCB.postTracks,
    putTracks: mixesCB.putTracks,
    deleteTracks: mixesCB.deleteTracks,

    getSamples: samplesCB.getSamples,
    postSamples: samplesCB.postSamples
};
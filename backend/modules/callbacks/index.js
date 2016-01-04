var usersCB = require('./users');
var sessionsCB = require('./sessions');
var mixesCB = require('./mixes');

module.exports = {

    postUsers: usersCB.postUsers,

    postSessions: sessionsCB.postSessions,
    deleteSessions: sessionsCB.deleteSessions,

    getMixes: mixesCB.getMixes,
    postMixes: mixesCB.postMixes

};
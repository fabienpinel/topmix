var callbacks = require('../callbacks');


module.exports = function (router) {

    router.post('/api/users', callbacks.postUsers);
    router.post('/api/sessions', callbacks.postSessions);
    router.delete('/api/sessions', callbacks.deleteSessions);
    router.get('/api/mixes', callbacks.getMixes);
    router.post('/api/mixes', callbacks.postMixes);
    router.get('/api/mixes/:idMixes', callbacks.getOneMixes);
    router.delete('/api/mixes/:idMixes/', callbacks.deleteMixes);
    router.post('/api/mixes/:idMixes/tracks/', callbacks.postTracks);
    router.put('/api/mixes/:idMixes/tracks/:name', callbacks.putTracks);
    router.delete('/api/mixes/:idMixes/tracks/:name', callbacks.deleteTracks);

    return router;

};
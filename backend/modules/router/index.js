var callbacks = require('../callbacks');


module.exports = function (router) {

    router.post('/api/users', callbacks.postUsers); // done

    router.get('/api/sessions', callbacks.getSessions); // done
    router.post('/api/sessions', callbacks.postSessions); // done
    router.delete('/api/sessions', callbacks.deleteSessions);

    router.get('/api/mixes', callbacks.getMixes); // done
    router.post('/api/mixes', callbacks.postMixes); // done
    router.get('/api/mixes/:idMixes', callbacks.getOneMixes);
    router.delete('/api/mixes/:idMixes/', callbacks.deleteMixes); // done

    router.post('/api/mixes/:idMixes/tracks/', callbacks.postTracks);
    router.put('/api/mixes/:idMixes/tracks/:idTracks', callbacks.putTracks);
    router.delete('/api/mixes/:idMixes/tracks/:idTracks', callbacks.deleteTracks);

    router.post('/api/mixes/:idMixes/tracks/:idTracks/samples/', callbacks.postSamples);
    router.delete('/api/mixes/:idMixes/tracks/:idTracks/samples/:idSamples', callbacks.deleteSamples);

    router.get('/api/samples/', callbacks.getSamples);

    return router;

};
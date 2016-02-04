var api = require('../api');


module.exports = function (router) {

    router.post('/api/users', api.postUsers);
    router.get('/api/users', api.getUsers);

    router.get('/api/sessions', api.getSessions);
    router.post('/api/sessions', api.postSessions);
    router.delete('/api/sessions', api.deleteSessions);

    router.get('/api/mixes', api.getMixes);
    router.post('/api/mixes', api.postMixes);
    router.get('/api/mixes/:idMixes', api.getOneMixes);
    router.delete('/api/mixes/:idMixes/', api.deleteMixes);

    router.post('/api/mixes/:idMixes/share/:userId', api.shareMix);
    router.post('/api/mixes/:idMixes/unshare/:userId', api.unShareMix);

    router.post('/api/mixes/:idMixes/tracks/', api.postTracks);
    router.put('/api/mixes/:idMixes/tracks/:idTracks', api.putTracks);
    router.delete('/api/mixes/:idMixes/tracks/:idTracks', api.deleteTracks);

    router.post('/api/mixes/:idMixes/tracks/:idTracks/samples/', api.postSamples);
    router.delete('/api/mixes/:idMixes/tracks/:idTracks/samples/:idSamples', api.deleteSamples);

    router.get('/api/samples/', api.getSamples);

    return router;

};
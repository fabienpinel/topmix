var callbacks = require('../callbacks');


module.exports = function (router) {

    router.post('/api/users', callbacks.postUsers);
    router.post('/api/sessions', callbacks.postSessions);
    router.delete('/api/sessions', callbacks.deleteSessions);
    router.get('/api/mixes', callbacks.getMixes);
    router.post('/api/mixes', callbacks.postMixes);

    return router;

};
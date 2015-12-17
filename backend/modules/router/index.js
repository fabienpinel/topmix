var callbacks = require('../callbacks');

module.exports = function (router) {

    router.post('/users', callbacks.createUser);

    return router;

};
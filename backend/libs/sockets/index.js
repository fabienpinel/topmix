var sockets = [];
var uniqid = require('uniqid');

module.exports = {

    /**
     * Get socket by Mail
     * @param mixId
     * @param sessionId
     */
    emitChangeByMixId: function (mixId, sessionId) {
        for (var i in sockets) {
            if (
                sockets[i].subscribedMix
                && sockets[i].subscribedMix == mixId
                && sockets[i].sessionId
                && sockets[i].sessionId != sessionId
            ) {
                sockets[i].emit('mixChange');
            }
        }
        return null;
    },

    /**
     * Socket CB
     * @param socket
     */
    socketCallback: function (socket) {

        var id = uniqid();
        sockets[id] = socket;

        socket.on('subscribe', function (data) {
            sockets[id].subscribedMix = data.mixId;
            sockets[id].sessionId = data.sessionId;
        });

        socket.on('disconnect', function () {
            delete sockets[id];
        });

    }

};
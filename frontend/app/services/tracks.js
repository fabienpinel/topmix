/**
 * Created by fabienpinel on 07/01/16.
 */
app.factory('TracksFactory', function ($http, $q, $rootScope, LoginFactory, MixesFactory) {

    var factory = {

        /**
         * Get all the mixes of the current user
         */
        postTracks: function (mixId, name) {
            var deferred = $q.defer();
            if (LoginFactory.data) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:7070/api/mixes/' + mixId + '/tracks',
                    data: {
                        name: name
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'sessionid': LoginFactory.data
                    }
                }).success(function (data, status) {
                    if (status == 201) {
                        deferred.resolve(MixesFactory.getMixById(mixId));
                    } else {
                        deferred.reject(data);
                    }
                }).error(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.reject(new Error('You must be logged in'))
            }
            return deferred.promise;
        },

        removeTracks: function (mixId, trackId) {
            var deferred = $q.defer();
            if (LoginFactory.data) {
                $http({
                    method: 'DELETE',
                    url: 'http://localhost:7070/api/mixes/' + mixId + '/tracks/' + trackId ,
                    headers: {
                        'Content-Type': 'application/json',
                        'sessionid': LoginFactory.data
                    }
                }).success(function (data, status) {
                    if (status == 204) {
                        deferred.resolve(MixesFactory.getMixById(mixId));
                    } else {
                        deferred.reject(data);
                    }
                }).error(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.reject(new Error('You must be logged in'))
            }
            return deferred.promise;
        },

        postSamples: function (mixId, trackId, index, sampleId) {
            var deferred = $q.defer();
            if (LoginFactory.data) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:7070/api/mixes/' + mixId + '/tracks/' + trackId + '/samples',
                    data: {
                        _id: sampleId,
                        index: index
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'sessionid': LoginFactory.data
                    }
                }).success(function (data, status) {
                    if (status == 201) {
                        deferred.resolve(MixesFactory.getMixById(mixId));
                    } else {
                        deferred.reject(data);
                    }
                }).error(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.reject(new Error('You must be logged in'))
            }
            return deferred.promise;
        },

        deleteSamples: function (mixId, trackId, index, sampleId) {
            var deferred = $q.defer();
            if (LoginFactory.data) {
                $http({
                    method: 'DELETE',
                    url: 'http://localhost:7070/api/mixes/' + mixId + '/tracks/' + trackId + '/samples/' + sampleId,
                    data: {
                        index: index
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'sessionid': LoginFactory.data
                    }
                }).success(function (data, status) {
                    if (status == 204) {
                        deferred.resolve(MixesFactory.getMixById(mixId));
                    } else {
                        deferred.reject(data);
                    }
                }).error(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.reject(new Error('You must be logged in'))
            }
            return deferred.promise;
        },

    };
    return factory;

});
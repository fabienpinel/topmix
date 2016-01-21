/**
 * Created by fabienpinel on 07/01/16.
 */
app.factory('MixesFactory', ['$http', '$q', '$rootScope', 'LoginFactory', function ($http, $q, $rootScope, LoginFactory) {


    var factory = {
        data: [],
        singleMix: {},

        /**
         * Get all the mixes of the current user
         */
        getMixes: function () {
            var deferred = $q.defer();
            if (LoginFactory.data) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:7070/api/mixes',
                    headers: {
                        'Content-Type': 'application/json',
                        'sessionid': LoginFactory.data
                    }
                }).success(function (data, status) {
                    if (status == 200) {
                        factory.data = data;
                        deferred.resolve(data);
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

        getMixById: function (id) {
            var deferred = $q.defer();
            if (LoginFactory.data) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:7070/api/mixes/' + id,
                    headers: {
                        'Content-Type': 'application/json',
                        'sessionid': LoginFactory.data
                    }
                }).success(function (data, status) {
                    if (status == 200) {
                        factory.singleMix = data;
                        $rootScope.$broadcast('singleMix', data);
                        deferred.resolve(data);
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

        /**
         * Create a mix for the current user
         */
        postMixes: function (mixName) {
            var deferred = $q.defer();
            if (LoginFactory.data) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:7070/api/mixes',
                    data: {name: mixName},
                    headers: {
                        'Content-Type': 'application/json',
                        'sessionid': LoginFactory.data
                    }
                }).success(function (data, status) {
                    if (status == 201) {
                        deferred.resolve(factory.getMixes());
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

        deleteMixes: function (mixId) {
            var deferred = $q.defer();
            if (LoginFactory.data) {
                $http({
                    method: 'DELETE',
                    url: 'http://localhost:7070/api/mixes/' + mixId,
                    headers: {
                        'Content-Type': 'application/json',
                        'sessionid': LoginFactory.data
                    }
                }).success(function (data, status) {
                    if (status == 204) {
                        deferred.resolve(factory.getMixes());
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
        }
    };
    return factory;

}]);
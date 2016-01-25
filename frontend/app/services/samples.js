app.factory('SamplesFactory', ['$http', '$q', 'LoginFactory', function ($http, $q, LoginFactory) {

    var factory = {
        data: [],

        /**
         * Get all the mixes of the current user
         */
        getSamples: function () {
            var deferred = $q.defer();
            if (LoginFactory.data) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:7070/api/samples',
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
        }

    };
    return factory;

}]);
app.factory('UsersFactory', ['$http', '$q', 'LoginFactory', function ($http, $q, LoginFactory) {
    var factory = {
        data: [],
        'get': function (query) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'http://localhost:7070/api/users?q=' + query,
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
            }).error(function () {
                deferred.reject('Erreur de connexion !');
            });
            return deferred.promise;
        }
    };
    return factory;
}]);
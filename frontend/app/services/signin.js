/**
 * Created by fabienpinel on 07/01/16.
 */
/**
 * Created by fabienpinel on 07/01/16.
 */
app.factory('SigninFactory', ['$http', '$q', function ($http, $q) {
    var factory = {
        logged: false,
        data: false,
        signin: function (name, password) {
            var object = {
                username: name,
                password: password
            };
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://localhost:7070/api/users',
                data: object,
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status) {
                if (status == 201) {
                    factory.logged = true;
                    factory.data = true;
                    deferred.resolve(data);
                } else {
                    deferred.reject(data);
                }
            }).error(function (data, status) {
                deferred.reject('Erreur de connexion !');
            });
            return deferred.promise;
        }

    };
    return factory;
}]);
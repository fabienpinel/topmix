/**
 * Created by fabienpinel on 07/01/16.
 */
app.factory('LoginFactory', ['$http', '$q', function ($http, $q) {
    var factory = {
        logged: false,
        data: false,
        login: function (name, password) {
            var object = {
                username: name,
                password: password
            };
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://localhost:7070/api/sessions',
                data: object,
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status) {
                if (status == 201) {
                    factory.logged = true;
                    factory.data = true;
                    window.localStorage.setItem('topmix_username', mail);
                    window.localStorage.setItem('topmix_userpassword', password);
                    deferred.resolve(data);
                } else {
                    deferred.reject(data);
                }
            }).error(function (data, status) {
                deferred.reject('Erreur de connexion !');
            });
            return deferred.promise;
        },
        logout: function () {
            factory.data = false;
            factory.logged = false;
            window.localStorage.removeItem('topmix_username');
            window.localStorage.removeItem('topmix_userpassword');
        }
    };
    return factory;
}]);
/**
 * Created by fabienpinel on 07/01/16.
 */
app.factory('LoginFactory', ['$http', '$q', function ($http, $q) {
    var factory = {
        logged: false,
        data: false,
        login: function (mail, password) {
            var object = {
                mail: mail,
                password: password
            };
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://localhost/login',
                data: object,
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status) {
                if (data.status == "success") {
                    factory.logged = true;
                    factory.data = true;
                    window.localStorage.setItem('topmix_usermail', mail);
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
            window.localStorage.removeItem('topmix_usermail');
            window.localStorage.removeItem('topmix_userpassword');

        }
    };
    return factory;
}]);
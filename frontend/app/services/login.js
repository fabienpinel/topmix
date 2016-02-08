/**
 * Created by fabienpinel on 07/01/16.
 */
app.factory('LoginFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var factory = {

        data: window.localStorage.getItem('topmix_usersessionid'),

        login: function (username, password) {
            var object = {
                username: username,
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
                    window.localStorage.setItem('topmix_username', username);
                    window.localStorage.setItem('topmix_userpassword', password);
                    window.localStorage.setItem('topmix_usersessionid', data);
                    factory.data = data;
                    deferred.resolve(data);
                } else {
                    deferred.reject(data);
                }
            }).error(function () {
                deferred.reject('Erreur de connexion !');
            });
            return deferred.promise;
        },

        logout: function () {
            window.localStorage.removeItem('topmix_username');
            window.localStorage.removeItem('topmix_userpassword');
            window.localStorage.removeItem('topmix_usersessionid');
        },

        checkLogin : function(sessionId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'http://localhost:7070/api/sessions',
                headers: {
                    'Content-Type': 'application/json',
                    'sessionid': sessionId
                }
            }).success(function (data, status) {
                if (status == 200) {
                    factory.data = sessionId;
                    $rootScope.$broadcast("loginPossible", {logged : true, user_sessionid: sessionId});
                    deferred.resolve(data);
                } else {
                    deferred.reject(data);
                }
            }).error(function () {
                deferred.reject('Erreur de connexion !');
            });
            return deferred.promise;
        },
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
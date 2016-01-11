/**
 * Created by fabienpinel on 07/01/16.
 */
app.factory('LoginFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var factory = {
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
                    window.localStorage.setItem('topmix_username', name);
                    window.localStorage.setItem('topmix_userpassword', password);
                    window.localStorage.setItem('topmix_usersessionid', data);
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
            window.localStorage.removeItem('topmix_username');
            window.localStorage.removeItem('topmix_userpassword');
            window.localStorage.removeItem('topmix_usersessionid');
        },
        checkLogin : function(user, password) {
            this.login(user, password).then(
                function(data){
                    //success
                    $rootScope.$broadcast("loginPossible", {logged : true, user_sessionid: factory.data});
                })
        }
    };
    return factory;
}]);
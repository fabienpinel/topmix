'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('TopMix', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
      $.material.init();
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);


app.run([ '$rootScope', 'LoginFactory','$location', function ($rootScope, LoginFactory, $location){
  $rootScope.logged = false;
  $rootScope.user = null;

  /************ Global Logout ************/
  $rootScope.logout = function () {
    LoginFactory.logout();
    $rootScope.logged = false;
    $rootScope.user = null;
    $location.path('/');
    window.location.reload();
  };
  /************ Global Login ************/
  $rootScope.login = function(mail, pass){
    LoginFactory.login(mai, pass).then(
        function(data){
          //success
          $rootScope.logged = true;
          $rootScope.user = data;
        },
        function(message){
          //error
          console.log("Error Login: "+message);
        }
    )
  };

  if (window.localStorage.getItem('topmix_usermail') && window.localStorage.getItem('topmix_userpassword')) {
    $rootScope.login(window.localStorage.getItem('topmix_usermail') , window.localStorage.getItem('topmix_userpassword') );
  }
}]);
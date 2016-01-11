'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('TopMix', [
  'ngRoute',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
      $.material.init();
  $routeProvider.otherwise({redirectTo: '/'});
}]);

app.directive('header', function() {
    return {
        controller: "HeaderController",
        templateUrl: "partials/header.html",
        scope: {},
        restrict: "E"
    };
});


app.run([ '$rootScope', 'LoginFactory','SigninFactory','$location', function ($rootScope, LoginFactory, SigninFactory, $location){


  //TODO try to get the sessionid also
  //TODO fix the bug -> when its called, the variables are still undefined
 /* if (window.localStorage.getItem('topmix_username') && window.localStorage.getItem('topmix_userpassword')) {
    $rootScope.login(window.localStorage.getItem('topmix_username') , window.localStorage.getItem('topmix_userpassword'));
  }
  */



}]);
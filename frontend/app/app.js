'use strict';

// Declare app level module which depends on views, and components

var app = angular.module('TopMix', [
  'ngRoute',
  'myApp.version',
  angularDragula(angular),
    'ngAudio'
]).

config(['$routeProvider', function($routeProvider) {

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
app.directive('musicManager', function() {
    return {
        controller: "MusicManagerController",
        templateUrl: "partials/musicManager.html",
        scope: {},
        restrict: "E"
    };
});
app.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);

        for (var i=0; i<total; i++) {
            input.push(i);
        }

        return input;
    };
});

app.run(['$rootScope','LoginFactory', function ($rootScope, LoginFactory){

  //TODO try to get the sessionid also
  //TODO fix the bug -> when its called, the variables are still undefined
  if (window.localStorage.getItem('topmix_username') && window.localStorage.getItem('topmix_userpassword')) {
      LoginFactory.checkLogin(window.localStorage.getItem('topmix_username'), window.localStorage.getItem('topmix_userpassword'));

  }




}]);

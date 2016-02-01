'use strict';

// Declare app level module which depends on views, and components

var app = angular.module('TopMix', [
    'ngAudio',
    'ui.router'
]);

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
  if (window.localStorage.getItem('topmix_usersessionid')) {
      LoginFactory.checkLogin(window.localStorage.getItem('topmix_usersessionid'));
  }

}]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "partials/home.html"
        })
        .state('mixes', {
            url: "/mixes",
            templateUrl: "partials/mixes.html",
            controller: 'MixesCtrl',
            controllerAs: 'MixesCtrl'
        })
        .state('singleMix', {
            url: "/mixes/:id",
            template: "<music-manager></music-manager>"
        })
});
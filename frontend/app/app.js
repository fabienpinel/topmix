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

    //nx.add("slider", {parent : "multipisteVolume", label: "coucou",height: 200, width: 80});
    //TODO to be moved somewehere else
    nx.onload = function() {
/*

        sliderPiste1.hslider = false;
        sliderPiste1.val.value = 50;
        sliderPiste1.draw();

*/



    }

    nx.colorize("#3399FF")


}]);

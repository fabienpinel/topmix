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
  $routeProvider.otherwise({redirectTo: '/'});
}]);


app.run([ '$rootScope', 'LoginFactory','SigninFactory','$location', function ($rootScope, LoginFactory, SigninFactory, $location){
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
  $rootScope.login = function(){
    console.log("Trying to login with: "+$rootScope.username_loginModal+"/"+$rootScope.password_loginModal);
    LoginFactory.login($rootScope.username_loginModal, $rootScope.password_loginModal).then(
        function(data){
          //success
          console.log("Login success",data);
          $rootScope.logged = true;
          $rootScope.user_sessionid = data;
        },
        function(message){
          //error
          console.log("Error Login: "+message);
        }
    )
  };
  /************ Global Logout ************/
  $rootScope.signin = function(){
    console.log("Trying to signin with: "+$rootScope.username_signinModal+"/"+$rootScope.password_signinModal);
    SigninFactory.signin($rootScope.username_signinModal, $rootScope.password_signinModal).then(
        function(data){
          //success
          console.log("Signin success",data);
          $rootScope.logged = true;
          $rootScope.user_sessionid = data;
        },
        function(message){
          //error
          console.log("Error Login: "+message);
        }
    )

  };
/*
  //TODO try to get the sessionid also
  //TODO fix the bug -> when its called, the variables are still undefined
  if (window.localStorage.getItem('topmix_username') && window.localStorage.getItem('topmix_userpassword')) {
    $rootScope.login(window.localStorage.getItem('topmix_username') , window.localStorage.getItem('topmix_userpassword'));
  }
  */


}]);
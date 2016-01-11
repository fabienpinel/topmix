/**
 * Created by fabienpinel on 11/01/16.
 */
app.controller("HeaderController" , ['$scope','LoginFactory', 'SigninFactory', "$location", function($scope, LoginFactory, SigninFactory, $location){
    $scope.logged = false;
    $scope.user = null;

    /************ Global Logout ************/
    $scope.logout = function () {
        LoginFactory.logout();
        $scope.logged = false;
        $scope.user = null;
    };
    /************ Global Login ************/
    $scope.login = function(){
        console.log("Trying to login with: "+$scope.username_loginModal+"/"+$scope.password_loginModal);
        LoginFactory.login($scope.username_loginModal, $scope.password_loginModal).then(
            function(data){
                //success
                console.log("Login success",data);
                $scope.logged = true;
                $scope.user_sessionid = data;
                //hide the modal
                $("#loginModal").modal('hide');
            },
            function(message){
                //error
                console.log("Error Login: "+message);
                //TODO show error de login
            }
        )
    };
    /************ Global Logout ************/
    $scope.signin = function(){
        console.log("Trying to signin with: "+$scope.username_signinModal+"/"+$scope.password_signinModal);
        SigninFactory.signin($scope.username_signinModal, $scope.password_signinModal).then(
            function(data){
                //success
                console.log("Signin success",data);
                $scope.logged = true;
                $scope.user_sessionid = data;
            },
            function(message){
                //error
                console.log("Error Login: "+message);
                //TODO show error de signin
            }
        )

    };
}]);
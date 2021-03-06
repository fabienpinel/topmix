/**
 * Created by fabienpinel on 11/01/16.
 */
app.controller("HeaderController" , ['$scope', '$rootScope', 'LoginFactory', "$location", function($scope,$rootScope, LoginFactory, $location){
    $scope.logged = false;
    $scope.user_sessionid = null;

    $scope.$on("loginPossible", function(event, args) {
        $scope.logged = args.logged;
        $scope.user_sessionid = args.user_sessionid;
    });

    /************ Global Logout ************/
    $scope.logout = function () {
        LoginFactory.logout();
        $scope.logged = false;
        $scope.user = null;
        $scope.user_sessionid = null;
       /* $location.path('/');
        window.location.reload();*/
    };
    /************ Global Login ************/
    $scope.login = function(){
        //console.log("Trying to login with: "+$scope.username_loginModal+"/"+$scope.password_loginModal);
        LoginFactory.login($scope.username_loginModal, $scope.password_loginModal).then(
            function(data){
                //success
                //console.log("Login success",data);
                $scope.logged = true;
                $scope.user_sessionid = data;
                //hide the modal
                $("#loginModal").modal('hide');
            },
            function(message){
                //error
                //console.log("Error Login: "+message);
                //TODO show error de login
            }
        )
    };
    /************ Global Logout ************/
    $scope.signin = function(){
        //console.log("Trying to signin with: "+$scope.username_signinModal+"/"+$scope.password_signinModal);
        LoginFactory.signin($scope.username_signinModal, $scope.password_signinModal).then(
            function(data){
                //success
                LoginFactory.login($scope.username_signinModal, $scope.password_signinModal).then(
                    function(data){
                        //success
                        //console.log("Login success",data);
                        $scope.logged = true;
                        $scope.user_sessionid = data;
                        //hide the modal
                        $("#signinModal").modal('hide');
                    },
                    function(message){
                        //error
                        //console.log("Error Login: "+message);
                        //TODO show error de login
                    }
                );
            },
            function(message){
                //error
                //console.log("Error Login: "+message);
                //TODO show error de signin
            }
        )

    };
}]);
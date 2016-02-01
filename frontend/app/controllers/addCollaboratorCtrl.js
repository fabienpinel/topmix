app.controller('AddCollaboratorCtrl', function ($scope, UsersFactory, MixesFactory, $rootScope) {

    $scope.mix = {};

    $scope.$on('selectedMix', function (name, mix) {
        $scope.mix = mix;
    });

    $scope.searchQuery = '';
    $scope.searchResults = [];
    $scope.searchUser = function () {
        if ($scope.searchQuery) {
            UsersFactory
                .get($scope.searchQuery)
                .then(function (data) {
                    // filter only users that are not in this mix
                    $scope.searchResults = data.filter(function (result) {
                        for (var i = 0; i < $scope.mix.userId.length; i++) {
                            if ($scope.mix.userId[i]._id == result._id) return false;
                        }
                        return true;
                    });
                })
                .catch(function () {
                    $scope.searchResults = [];
                });
        } else {
           $scope.searchResults = [];
        }
    };

    $scope.addUser = function (userId) {
        MixesFactory
            .shareMix($scope.mix._id, userId)
            .then(function (mixes) {
                $rootScope.$broadcast('mixesChange', mixes);
                $scope.searchUser();
            })
            .catch(function () {});
    };

    $scope.deleteUser = function (userId) {
        MixesFactory
            .unshareMix($scope.mix._id, userId)
            .then(function (mixes) {
                $rootScope.$broadcast('mixesChange', mixes);
                $scope.searchUser();
            })
            .catch(function () {})
    };

});
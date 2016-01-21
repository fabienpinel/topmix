app.controller('MixesCtrl', function ($scope, MixesFactory) {

    $scope.mixes = MixesFactory.data;
    $scope.newMix = {};

    function getMixes() {
        MixesFactory
            .getMixes()
            .then(function (mixes) {
                $scope.mixes = mixes;
            })
            .catch(function (err) {
                console.error(err);
                $scope.mixes = [];
            });
    }
    getMixes();

    $scope.postMixes = function () {
        MixesFactory
            .postMixes($scope.newMix.name)
            .then(function (mixes) {
                $scope.newMix = {};
                $scope.mixes = mixes;
            })
            .catch(function (err) {
                console.error(err);
            });
    };

    $scope.deleteMixes = function (id) {
        MixesFactory
            .deleteMixes(id)
            .then(function (mixes) {
                $scope.mixes = mixes;
            })
            .catch(function (err) {
                console.error(err);
            });
    }


});
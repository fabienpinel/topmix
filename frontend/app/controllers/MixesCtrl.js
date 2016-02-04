app.controller('MixesCtrl', function ($scope, MixesFactory, $rootScope) {

    var vm = this;

    vm.mixes = MixesFactory.data;
    vm.newMix = {};

    function getMixes() {
        MixesFactory
            .getMixes()
            .then(function (mixes) {
                //console.log(mixes);
                vm.mixes = mixes;
            })
            .catch(function (err) {
                console.error(err);
                vm.mixes = [];
            });
    }
    getMixes();

    $rootScope.$on('mixesChange', function (name, mixes) {
        vm.mixes = mixes;
        for (var i = 0; i < mixes.length; i++) {
            if (mixes[i]._id == vm.selectedMix._id) {
                $rootScope.$broadcast('selectedMix', mixes[i]);
            }
            break;
        }
    });

    vm.postMixes = function () {
        MixesFactory
            .postMixes(vm.newMix.name)
            .then(function (mixes) {
                vm.newMix = {};
                vm.mixes = mixes;
            })
            .catch(function (err) {
                console.error(err);
            });
    };

    vm.deleteMixes = function (id) {
        MixesFactory
            .deleteMixes(id)
            .then(function (mixes) {
                vm.mixes = mixes;
            })
            .catch(function (err) {
                console.error(err);
            });
    };

    vm.selectedMix = {};
    vm.openAddDialog = function (mix) {
        $('#add-collaborator').modal('show');
        vm.selectedMix = mix;
        $rootScope.$broadcast('selectedMix', mix);
    };


});
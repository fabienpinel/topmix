app.directive('dragPiste', function(SamplesFactory) {
    return {
        restrict: 'E',
        templateUrl: 'partials/piste.html',
        scope: {tracks: '=tracks'},
        controller: function($scope, $stateParams, TracksFactory) {

            $scope.tracks = [];

            $scope.$on('singleMix', function (name, data) {
                $scope.tracks = data.tracks;
            });

            $scope
                .$on('first-bag.drop', function (e, target, source, sibling) {
                    console.log('drop that bass', e, target, source, sibling);
                });


            $scope.deleteTrack = function (trackId) {
                console.log($stateParams.id, trackId);
                TracksFactory
                    .removeTracks($stateParams.id, trackId);
            };

            // TODO MAXIME : make a directive
            // TODO MAXIME : make a directive
            // TODO MAXIME : make a directive
            // TODO MAXIME : make a directive

            $scope.myMarginStyle = {marginLeft: '0px'};
            var containsTracks = document.querySelector('#contains-tracks');
            containsTracks.addEventListener("scroll", function() {
                $scope.myMarginStyle = {marginLeft: containsTracks.scrollLeft + 'px'};
            }, false);

            // TODO MAXIME : make a directive
            // TODO MAXIME : make a directive
            // TODO MAXIME : make a directive
            // TODO MAXIME : make a directive
        },
        link: function ($scope) {

            $scope.samples = [];

            SamplesFactory
                .getSamples()
                .then(function (samples) {
                    $scope.samples = samples;
                    console.log(samples);
                })
                .catch(function (err) {
                    console.error(err);
                });

            $scope.order = function(predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

        }
    }
});
app.directive('dragPiste', function(SamplesFactory) {
    return {
        restrict: 'E',
        templateUrl: 'partials/piste.html',
        scope: {tracks: '=tracks'},
        controller: function($scope, $stateParams, TracksFactory) {

            $scope.tracks = [];

            $scope.$on('singleMix', function (name, data) {
                $scope.tracks = data.tracks;
                $scope.tracks.forEach(function (track) {
                    for (var i = 0; i < 10; i++) track.samples.push(null);
                });
            });

            $scope.deleteTrack = function (trackId) {
                console.log($stateParams.id, trackId);
                TracksFactory
                    .removeTracks($stateParams.id, trackId);
            };

            $scope.myDragStyle = {display: 'none', left:'0px', right:'0px', position: 'fixed', background: 'red', zIndex:'100000', width: '100px'};
            document.addEventListener('mousemove', function (event) {
                $scope.myDragStyle.left = (event.clientX+1) + 'px';
                $scope.myDragStyle.top = event.clientY + 'px';
                $scope.$apply();
            }, false);
            document.addEventListener('mouseup', function () {
                $scope.myDragStyle.display = 'none';
                $scope.$apply();
                $scope.selectedSample = null;
            }, false);


            $scope.selectedSample = null;
            var fromTrack = null;
            var fromIndex = null;




            $scope.selectSample = function (sample) {
                $scope.selectedSample = sample._id;
                $scope.myDragStyle.display = 'block';
            };
            $scope.dropSample = function (trackId, $index) {
                if ($scope.selectedSample) {
                    if (fromTrack && fromIndex >= 0 && fromIndex !== null) {
                        // if we come from sample
                        TracksFactory.deleteSamples($stateParams.id, fromTrack, fromIndex, $scope.selectedSample);
                        TracksFactory.postSamples($stateParams.id, trackId, $index, $scope.selectedSample);
                        fromTrack = null;
                        fromIndex = null;
                    } else {
                        // if we some from library
                        TracksFactory.postSamples($stateParams.id, trackId, $index, $scope.selectedSample);
                    }
                    $scope.selectedSample = null;
                }
            };
            $scope.dragSample = function (trackId, $index, sample) {
                $scope.selectedSample = sample;
                $scope.myDragStyle.display = 'block';
                fromTrack = trackId;
                fromIndex = $index;
            };
            $scope.deleteSample = function (trackId, $index, sample) {
                TracksFactory.deleteSamples($stateParams.id, trackId, $index, sample);
            };


            // TODO MAXIME : make a directive
            // TODO MAXIME : make a directive
            // TODO MAXIME : make a directive
            // TODO MAXIME : make a directive


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

            $scope.myMarginStyle = {marginLeft: '0px'};
            var containsTracks = document.querySelector('#contains-tracks');
            containsTracks.addEventListener("scroll", function() {
                $scope.myMarginStyle = {marginLeft: containsTracks.scrollLeft + 'px'};
                $scope.$apply();
            }, false);

        }
    }
});
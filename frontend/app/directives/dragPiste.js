app.directive('dragPiste', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/piste.html',
        scope: {tracks: '=tracks'},
        controller: function($scope, dragulaService, $stateParams, TracksFactory) {

            $scope.tracks = [];

            dragulaService.options($scope, "sixth-bag", {
                moves: function (el, container, handle) {
                    return handle.className === 'handle';
                }
            });

            $scope.$on('singleMix', function (name, data) {
                $scope.tracks = data.tracks;
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





        }
    }
});
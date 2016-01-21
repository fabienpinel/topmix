app.directive('dragPiste',['dragulaService', function(dragulaService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/piste.html',
        scope: {tracks: '=tracks'},
        controller: function($scope, dragulaService) {
            $scope.draggableObjects = $scope.tracks;
            dragulaService.options($scope, "sixth-bag", {
                moves: function (el, container, handle) {
                    return handle.className === 'handle';
                }
            });







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
}]);
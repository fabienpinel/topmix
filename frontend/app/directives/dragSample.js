app.directive('dragSample',['dragulaService', function(dragulaService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/sample.html',
        scope: {tracks: '=tracks'},
        controller: function($scope, dragulaService) {
            $scope.draggableObjects = $scope.tracks;
            dragulaService.options($scope, "first-bag", {
                moves: function (el, container, handle) {
                    return handle.className === 'blbl';
                }
            });
        }
    }
}]);
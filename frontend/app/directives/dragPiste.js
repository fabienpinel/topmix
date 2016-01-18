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
        }
    }
}]);
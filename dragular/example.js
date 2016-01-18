'use strict';

var app = angular.module('angular-dragula-example', [angularDragula(angular)]);

app.controller('MuchExampleCtrl', ['$scope', 'dragulaService',
    function ($scope, dragulaService) {
        dragulaService.options($scope, 'sixth-bag', {
            moves: function (el, container, handle) {
                return handle.className === 'handle';
            }
        });
    }
]);

/**
 * Created by fabienpinel on 11/01/16.
 */
app.controller("MusicManagerController" , ['dragulaService','$scope', '$rootScope',"$location", function(dragulaService, $scope,$rootScope, $location) {
    //nx.add("slider", {parent : "multipisteVolume", label: "coucou",height: 200, width: 80});

    nx.onload = function() {
        /*
         sliderPiste1.hslider = false;
         sliderPiste1.val.value = 50;
         sliderPiste1.draw();
         */
    }
    nx.colorize("#3399FF");
    $scope.draggableObjects = [
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'},
        {name: '6'},
        {name: '7'},
        {name: '8'},
        {name: '9'},
        {name: '10'}
    ];

}]);
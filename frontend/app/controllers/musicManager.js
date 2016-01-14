/**
 * Created by fabienpinel on 11/01/16.
 */
app.controller("MusicManagerController" , ['$scope', '$rootScope',"$location", "ngAudio", function($scope,$rootScope, $location, ngAudio) {
    //nx.add("slider", {parent : "multipisteVolume", label: "coucou",height: 200, width: 80});
    nx.onload = function() {
         sliderPiste1.hslider = false;
         sliderPiste1.val.value = 50;
         sliderPiste1.draw();

    };
    nx.colorize("#3399FF");

    $scope.audios = [
        ngAudio.load('audio/song1.mp3'),
        ngAudio.load('audio/song2.mp3'),
        ngAudio.load('audio/song3.mp3'),
        ngAudio.load('audio/daniel_stern_robot_hitchiker.mp3'),
    ];

    $.material.init();

}]);
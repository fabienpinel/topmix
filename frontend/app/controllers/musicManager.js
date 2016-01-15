/**
 * Created by fabienpinel on 11/01/16.
 */
<<<<<<< HEAD
app.controller("MusicManagerController" , ['dragulaService','$scope', '$rootScope',"$location", "ngAudio", function(dragulaService, $scope,$rootScope, $location, ngAudio) {
    //nx.add("slider", {parent : "multipisteVolume", label: "coucou",height: 200, width: 80});

    $scope.paused = true;
    nx.onload = function() {
         sliderPiste1.hslider = false;
         sliderPiste1.val.value = 50;
         sliderPiste1.draw();

    };
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

    $scope.audios= [
        ngAudio.load('../samples/songs/VFH2128BPMCoolKit1.wav'),
        ngAudio.load('../samples/songs/VFH2128BPMCoolKit2.wav')
    ];

    $.material.init();



    $scope.togglePlayPause = function(){
        if($scope.paused){
            //play
            //play all sounds from audios table
            $scope.audios.forEach(function(audio){
                audio.play();
            });
            $scope.paused = false;
        }else{
            //pause
            $scope.audios.forEach(function(audio){
                audio.pause();
            });
            $scope.paused=true;

        }
    }
    $scope.restart = function(){
        $scope.audios.forEach(function(audio){
            audio.restart();
        });
    }

    $scope.toggleLoop = function(){
            $scope.audios.forEach(function(audio){
                audio.loop = $scope.loop;
            });
    }
}]);
/**
 * Created by fabienpinel on 11/01/16.
 */
app.controller("MusicManagerController" , ['dragulaService','$scope', '$rootScope',"$location", "ngAudio", function(dragulaService, $scope,$rootScope, $location, ngAudio) {
    //nx.add("slider", {parent : "multipisteVolume", label: "coucou",height: 200, width: 80});

    $scope.paused = true;
    nx.onload = function() {
        sliderPiste1.hslider = false;
        sliderPiste1.val.value = 50;
        sliderPiste1.draw();

        sliderPiste1.on('*', function(data) {
            $scope.sliderPiste1Changed(data.value);
        });
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

    $scope.sliderPiste1Changed = function(val){
        console.log("changed ",val);
        $scope.audios[0].volume = val;
        console.log($scope.audios);
    };

    $scope.sliderChangeListener = function(data){
        //generic listener for a slider
    }
    $scope.audios= [
        {   file: ngAudio.load('../samples/songs/VFH2128BPMCoolKit1.wav'),
            volume: 50
        },
        {   file: ngAudio.load('../samples/songs/VFH2128BPMCoolKit2.wav'),
            volume: 50
        }
    ];

    $.material.init();

    $scope.togglePlayPause = function(){
        if($scope.paused){
            //play
            //play all sounds from audios table
            $scope.audios.forEach(function(audio){
                audio.file.play();
            });
            $scope.paused = false;
        }else{
            //pause
            $scope.audios.forEach(function(audio){
                audio.file.pause();
            });
            $scope.paused=true;

        }
    }
    $scope.restart = function(){
        $scope.audios.forEach(function(audio){
            audio.file.restart();
        });
    }

    $scope.toggleLoop = function(){
        $scope.audios.forEach(function(audio){
            audio.file.loop = $scope.loop;
        });
    }
    /*
    * Parcourir l'objet $scope.audios et ajouter le NX slider pour chaque fichier audio + ajouter listener aussi
    * */
}]);
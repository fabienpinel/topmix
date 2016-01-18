/**
 * Created by fabienpinel on 11/01/16.
 */
app.controller("MusicManagerController" , ['dragulaService','$scope', "$location", "ngAudio", function(dragulaService, $scope, $location, ngAudio) {
    //nx.add("slider", {parent : "multipisteVolume", label: "coucou",height: 200, width: 80});



    $scope.paused = true;


    nx.onload = function() {

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

    $scope.test = function() {
        $scope.audios.push({   file: ngAudio.load('../samples/songs/VFH2128BPMCoolKit1.wav'),
            volume: 34
        });
    }

    $scope.changeVolume = function(id, data){
        $scope.audios[(id.split("-")[1])].file.volume = data;
    }
    $scope.audios= [
        {   file: ngAudio.load('../samples/songs/VFH2128BPMCoolKit1.wav'),
            name:"1"
        },
        {   file: ngAudio.load('../samples/songs/VFH2128BPMCoolKit2.wav'),
            name:"piste 2"
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
    };
    $scope.restart = function(){
        $scope.audios.forEach(function(audio){
            audio.file.restart();
        });
    };

    $scope.toggleLoop = function(){
        $scope.audios.forEach(function(audio){
            audio.file.loop = $scope.loop;
        });
    };

    $scope.initSliders = function(){
        for(var i=0; i<$scope.audios.length; i++){
            nx.add("slider", {
                parent: "multipisteVolume",
                w: "60px",
                h: "160px",
                name: "piste-"+i
        });
            console.log("nx wodgets ",nx.widgets);
        }


        angular.forEach(nx.widgets, function(w) {
            if(w.type == "slider"){
                w.on('*', function(data) {
                    $scope.changeVolume(w.canvas.id, w.val.value);
                });
            }
        });

    };

    $scope.initSliders();
    /*
    * Parcourir l'objet $scope.audios et ajouter le NX slider pour chaque fichier audio + ajouter listener aussi
    * */
}]);
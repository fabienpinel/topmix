/**
 * Created by fabienpinel on 11/01/16.
 */
app.controller("MusicManagerController" , function($scope, ngAudio, MixesFactory, TracksFactory, SamplesFactory, $stateParams) {

    $scope.mix = {};
    $scope.paused = true;
    $.material.init();


    nx.onload = function() {

    };
    nx.colorize("#3399FF");

    $scope.lines= [
        {
            song : [
                {   fileName: '../samples/VFH2_Cool_Kit_2.wav',
                    name:"piste 2",
                    file:""
                },
                {   fileName: '../samples/VFH2_Cool_Kit_1.wav',
                    name:"1",
                    file: ""
                },
                {   fileName: '../samples/VFH2_Cool_Kit_2.wav',
                    name:"piste 2",
                    file:""
                }

            ],
            counter: 0
        },
        {
            song : [
                {   fileName: '../samples/VFH2_Cool_Kit_1.wav',
                    name:"1",
                    file: ""
                }
            ],
            counter: 0
        }

    ];


    function getMix() {
        MixesFactory
            .getMixById($stateParams.id)
            .then(function (mix) {
                $scope.mix = mix;
                //instanciate the waveforms
                setTimeout(function(){  $scope.initSliders(); }, 500);

                console.log("Mixes", $scope.mix);
            })
            .catch(function (err) {
                console.error(err);
                $scope.mix = {};
            });
    }

    $scope.postTrack = function () {
        TracksFactory
            .postTracks($stateParams.id, 'piste sans nom')
            .then(function (mix) {
                $scope.mix = mix;
            })
            .catch(function (err) {
                console.error(err);
                $scope.mix = {};
            });
    };

    $scope.changeVolume = function(id, data){
        var index = (id.split("-")[1]);
        for(var i=0; i<$scope.lines[index].song.length; i++){
            $scope.lines[index].song[i].file.setVolume(data);
        }
    };


    $scope.play = function(line, index){
        //play
        setTimeout(function(){
            if(++index < line.song.length){
                line.song[index].file.play();
                $scope.play(line, index);
            }
        }, (line.song[index].file.getDuration()*1000));

    };

    $scope.togglePlayStop = function(){
        if($scope.paused){
            var index = 0;
            //play all sounds from audios table
            $scope.lines.forEach(function(line){
                console.log("LINES ",$scope.lines);
                console.log("foreach debug line.song ", line);

                console.log("next song in ", line.song[index].file.getDuration()*1000);
                line.song[index].file.play();
                $scope.play(line, index);

            });

            $scope.paused = false;
        }else{
            $scope.lines.forEach(function(line){
                line.song.forEach(function(lineSong) {
                    if(lineSong.file.isPlaying()){
                        lineSong.file.stop();

                    }else{
                        lineSong.file.seekTo(0);

                    }
                });
            });
            $scope.paused = true;
        }
    };

    $scope.toggleLoop = function(){
        $scope.loop != $scope.loop ;
    };


    $scope.initSliders = function(){
        console.log($scope.mix);
        console.log($scope.mix.tracks.length);

        $scope.lines = [];



        for(var i=0; i<$scope.mix.tracks.length; i++){
            nx.add("slider", {
                parent: "multipisteVolume",
                w: "60px",
                h: "160px",
                name: "piste-"+i
            });
            $scope.lines[i] = {song: null};
            $scope.lines[i].song = [];

            for(var j=0; j<$scope.mix.tracks[i].samples.length; j++){

                $scope.lines[i].song[j] = {file: null};

                    $scope.lines[i].song[j].file = (Object.create(WaveSurfer));



                    $scope.lines[i].song[j].file.init({
                        container: '#sample' + $scope.mix.tracks[i]._id + j,
                        waveColor: 'violet',
                        progressColor: 'purple',
                        barWidth: 4
                    });

                    var path = SamplesFactory.getSampleById($scope.mix.tracks[i].samples[j]);
                    console.log("path ", path);
                    // $scope.mix.tracks[i].samples[j].file

                    $scope.lines[i].song[j].file.on('ready', function () {
                        console.log("Wavesurer Ready");
                        //wavesurfer.play();
                    });

            if($scope.mix.tracks[i].samples[j] != null) {
                    $scope.lines[i].song[j].file.load("../samples/"+path.name);
            }
                else $scope.lines[i].song[j].file.load("../samples/empty.wav");

                    console.log("nx widgets ",nx.widgets);
                    console.log($scope.lines);

            }

        }

        angular.forEach(nx.widgets, function(w) {
            if(w.type == "slider"){
                w.on('*', function(data) {
                    $scope.changeVolume(w.canvas.id, w.val.value);
                });
            }
        });

    };

    $scope.resetSliders = function() {
        console.log("c'est la fête");
    }

    $scope.$watch('mix', function() {
        if($scope.mix != undefined) $scope.resetSliders();
    });

    getMix();


});
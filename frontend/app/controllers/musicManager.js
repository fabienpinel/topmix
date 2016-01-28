/**
 * Created by fabienpinel on 11/01/16.
 */
app.controller("MusicManagerController" , function($scope, ngAudio, MixesFactory, TracksFactory, $stateParams) {

    $scope.mix = {};
    $scope.paused = true;
    $.material.init();


    nx.onload = function() {

    };
    nx.colorize("#3399FF");

    $scope.line1 =[
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

    ];
    $scope.line2 =[
        {   fileName: '../samples/VFH2_Cool_Kit_1.wav',
            name:"1",
            file: ""
        }
    ];
    $scope.lines= [
        {
            song : $scope.line1,
            counter: 0
        },
        {
            song : $scope.line2,
            counter: 0
        }

    ];



    function getMix() {
        MixesFactory
            .getMixById($stateParams.id)
            .then(function (mix) {
                $scope.mix = mix;
            })
            .catch(function (err) {
                console.error(err);
                $scope.mix = {};
            });
    }
    getMix();

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


    $scope.test = function () {
        $scope.audios.push({
            file: ngAudio.load('../samples/VFH2_Cool_Kit_1.wav'),
            volume: 34
        });
    };

    $scope.changeVolume = function(id, data){
        var index = (id.split("-")[1]);
        for(var i=0; i<$scope.lines[index].song.length; i++){
            $scope.lines[index].song[i].file.setVolume(data);
        }
    }


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
        console.log($scope.lines.length);
        for(var i=0; i<$scope.lines.length; i++){
            nx.add("slider", {
                parent: "multipisteVolume",
                w: "60px",
                h: "160px",
                name: "piste-"+i
            });
            for(var j=0; j<$scope.lines[i].song.length; j++){
                $scope.lines[i].song[j].file = Object.create(WaveSurfer);
                $scope.lines[i].song[j].file.init({
                    container: '#wave',
                    waveColor: 'violet',
                    progressColor: 'purple',
                    barWidth: 4
                });

                $scope.lines[i].song[j].file.on('ready', function () {
                    console.log("Wavesurer Ready");
                    //wavesurfer.play();
                });

                $scope.lines[i].song[j].file.load($scope.lines[i].song[j].fileName);

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

    $scope.initSliders();


});
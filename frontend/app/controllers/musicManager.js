/**
 * Created by fabienpinel on 11/01/16.
 */
app.controller("MusicManagerController" , function($scope, ngAudio, MixesFactory, TracksFactory, SamplesFactory, $stateParams, $timeout) {

    $scope.mix = {};
    $scope.paused = true;
    $scope.allTheTimeouts = [];
    $scope.currentTimeout;
    $.material.init();

    $scope.searchBox = function() {
        $scope.$broadcast('searchBox');
    };


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
                $timeout(function(){  $scope.initSliders(); });
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

    $scope.changeVolume = function(trackId, volume, index){
        for(var i=0; i<$scope.lines[index].song.length; i++){
            $scope.lines[index].song[i].file.setVolume(volume/100);
        }
        TracksFactory
            .changeVolume($scope.mix._id, trackId , volume)
            .then(function(data){
                $scope.mix = data;
            })
            .catch(function(err){});



    };


    $scope.play = function(line, index){
            $scope.currentTimeout = $timeout(function () {
                if (++index < line.song.length && !$scope.paused) {
                    line.song[index].file.play();
                    $scope.play(line, index);
                }
            }, (line.song[index].file.getDuration() * 1000));

            $scope.allTheTimeouts.push($scope.currentTimeout);
    };

    $scope.togglePlayStop = function(){
        if($scope.paused){
            var index = 0;
            //play all sounds from audios table
            $scope.lines.forEach(function(line){

                //console.log("next song in ", line.song[index].file.getDuration()*1000);
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
            //loop on the timeouts in order to erase all of them
            $scope.allTheTimeouts.forEach(function(to){
                $timeout.cancel(to);
            });
            $scope.allTheTimeouts = [];


            $scope.paused = true;
        }
    };

    $scope.$on("drawSample", function(name,trackid, index){
        if ($scope.lines.length != $scope.mix.tracks.length) {
            for (var i=0; i<$scope.mix.tracks.length; i++){
                $scope.lines[i] = {song: []};
                for (var j = 0; j < $scope.mix.tracks[i].samples.length; j++) {
                    $scope.lines[i].song.push(null);
                }
            }
        }
        for(var i = 0; i<$scope.mix.tracks.length; i++){
            var j = index;
                if ($scope.mix.tracks[i]._id == trackid) {
                    $scope.lines[i].song[j] = {file: null};
                    $scope.lines[i].song[j].file = (Object.create(WaveSurfer));
                    $scope.lines[i].song[j].file.init({
                        container: '#sample' + $scope.mix.tracks[i]._id + j,
                        waveColor: '#03a9f4',
                        progressColor: '#3F51B5',
                        height: 32,
                        hideScrollbar: true
                    });
                    $scope.lines[i].song[j].file.setVolume($scope.mix.tracks[i].volume/100);
                    $scope.lines[i].song[j].file.toggleInteraction();
                    // $scope.mix.tracks[i].samples[j].file
                    var path = SamplesFactory.getSampleById($scope.mix.tracks[i].samples[j]);

                    if ($scope.mix.tracks[i].samples[j] != null) {
                        $scope.lines[i].song[j].file.load("../samples/" + path.name);
                    }
                    else {
                        $scope.lines[i].song[j].file.load("../samples/empty.wav");

                    }
                }
        }
    });
    $scope.initSliders = function() {
        $scope.lines = [];
        for(var i=0; i<$scope.mix.tracks.length; i++){
            $scope.lines.push({song: []});
            for (var j = 0; j < $scope.mix.tracks[i].samples.length; j++) {
                $scope.lines[i].song.push(null);
            }
        }
    };

    $scope.$on('singleMix', function (name, data) {
        $scope.mix = data;
        $scope.mix.tracks.forEach(function (track) {
            for (var i = 0; i < 10; i++) track.samples.push(null);
        });
    });

    getMix();


});
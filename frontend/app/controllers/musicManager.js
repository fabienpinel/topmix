/**
 * Created by fabienpinel on 11/01/16.
 */
app.controller("MusicManagerController" , function($scope, ngAudio, MixesFactory, TracksFactory, $stateParams) {

    $scope.mix = {};

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

    $scope.paused = true;

    $scope.draggableObjects = [
        {name: '1', volume: 100},
        {name: '2', volume: 100},
        {name: '3', volume: 100}
    ];

    $scope.test = function () {
        $scope.audios.push({
            file: ngAudio.load('../samples/VFH2_Cool_Kit_1.wav'),
            volume: 34
        });
    };

    $scope.changeVolume = function (id, data) {
        $scope.audios[id].file.volume = data;
    };
    $scope.audios = [
        {
            file: ngAudio.load('../samples/VFH2_Cool_Kit_1.wav'),
            name: "1"
        },
        {
            file: ngAudio.load('../samples/VFH2_Cool_Kit_2.wav'),
            name: "piste 2"
        }
    ];

    $.material.init();

    $scope.togglePlayPause = function () {
        if ($scope.paused) {
            //play
            //play all sounds from audios table
            $scope.audios.forEach(function (audio) {
                audio.file.play();
            });
            $scope.paused = false;
        } else {
            //pause
            $scope.audios.forEach(function (audio) {
                audio.file.pause();
            });
            $scope.paused = true;

        }
    };
    $scope.restart = function () {
        $scope.audios.forEach(function (audio) {
            audio.file.restart();
        });
    };

    $scope.toggleLoop = function () {
        $scope.audios.forEach(function (audio) {
            audio.file.loop = $scope.loop;
        });
    };

    $scope.volumeHasChanged = function (object, index) {
        $scope.changeVolume(index, object.volume / 100);
    }


});
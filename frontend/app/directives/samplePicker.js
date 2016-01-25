app.directive('samplePicker', function(SamplesFactory) {
    return {
        templateUrl: "partials/samplePicker.html",
        scope: {},
        restrict: "E",
        link: function ($scope) {

            $scope.samples = [];

            SamplesFactory
                .getSamples()
                .then(function (samples) {
                    $scope.samples = samples;
                    console.log(samples);
                })
                .catch(function (err) {
                    console.error(err);
                });

        }
    };
});
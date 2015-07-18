angular.module('starter.controllers', [])

.controller('SevenDayCtrl', function($scope, WeatherClient, WeatherTransformer) {
    $scope.city = 'Toronto'
    var forecast = WeatherClient.getWeeklyForecastByCity($scope.city);
    forecast.then(function resolve(message){
        WeatherTransformer.transformWeatherToForecast(message);
        $scope.settings = {
        };
    });
})

.controller('FancySevenDayCtrl', function($scope, WeatherClient, WeatherTransformer) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.city = 'Toronto'
    var forecast = WeatherClient.getWeeklyForecastByCity($scope.city);
    forecast.then(function resolve(message){
        WeatherTransformer.transformWeatherToForecast(message);
    });

})

.controller('PressureCtrl', function($scope, WeatherClient, WeatherTransformer) {
    $scope.city = 'Toronto'
    var forecast = WeatherClient.getWeeklyForecastByCity($scope.city);
    forecast.then(function resolve(message){
        WeatherTransformer.transformWeatherToForecast(message);
        $scope.settings = {
        };
    });
});

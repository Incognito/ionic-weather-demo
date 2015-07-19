angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, SearchService) {
    $scope.city = 'Toronto';
    SearchService.publish($scope.city)
    $scope.publish = function (){
        SearchService.publish($scope.city)
    }
})

.controller('SevenDayCtrl', function($scope, WeatherClient, WeatherTransformer, SearchService) {
    var today = new Date();
    var oneDay = 24*60*60*1000;

    $scope.getDayByOffset = function(index){
        var offsetTimestamp = +today + index * oneDay;

        return new Date(offsetTimestamp);
    }

    SearchService.subscribe(function(city){
        var forecast = WeatherClient.getWeeklyForecastByCity(city);
        forecast.then(function resolve(message){
            $scope.forecast = WeatherTransformer.transformWeatherToForecast(message);
        });
    });
})

.controller('FancySevenDayCtrl', function($scope, WeatherClient, WeatherTransformer, SearchService) {
    SearchService.subscribe(function(city){
        var forecast = WeatherClient.getWeeklyForecastByCity(city);
        forecast.then(function resolve(message){
            $scope.forecast = WeatherTransformer.transformWeatherToForecast(message);
        });
    });
})

.controller('PressureCtrl', function($scope, WeatherClient, WeatherTransformer, SearchService) {
    SearchService.subscribe(function(city){
        var forecast = WeatherClient.getWeeklyForecastByCity(city);
        forecast.then(function resolve(message){
            $scope.pressure = Math.round(
                WeatherTransformer.transformWeatherToPressure(message)
            );
        });
    });
});

angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, WeatherClient, WeatherTransformer, SearchService) {
    $scope.city = 'Toronto';
    SearchService.publish($scope.city)
    $scope.publish = function (){
        SearchService.publish($scope.city)
    };
    SearchService.subscribe(function(city){
        var forecast = WeatherClient.getWeeklyForecastByCity(city);
        forecast.then(function resolve(message){
            $scope.foundCity = message.city.name + ", " + message.city.country;
        });
    });
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

    $scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'Days from today'
            },
            yAxis: {
                axisLabel: 'Celcius',
                axisLabelDistance: 30
            }
        }
    };

    $scope.data = [{
        key: "Cumulative Return",
        values: [ { "label" : "A" , "value" : -29.765957771107 } ]
    }];

    SearchService.subscribe(function(city){
        var forecast = WeatherClient.getWeeklyForecastByCity(city);
        forecast.then(function resolve(message){
            $scope.forecast = WeatherTransformer.transformWeatherToGraph(message);
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

angular.module('starter.services', [])
.factory('WeatherClient', ['$http', '$q', function($http, $q){
    var baseUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    return {
        getWeeklyForecastByCity: function getWeeklyForecastByCity(city) {
            return $q(function(resolve, reject) {
                $http({
                        'method': 'GET',
                        'url': baseUrl + "/daily",
                        'cache': true,
                        'params' : {
                            'q': city,
                            'units': 'metric',
                            'cnt': '7',
                            'mode': 'json'
                        }
                    })
                    .success(function(data, status, headers, config){
                        if (data.cod && data.cod !== 200) { // Openweathermap doesn't return meaningful status codes
                            reject()
                        }
                        resolve(data)
                    })
                    .error(function(){
                        reject()
                    })
            });
        }
    };
}])
.factory('WeatherTransformer', [function(){
    return {
        transformWeatherToForecast: function (weatherApiResponse){
            var forecast = weatherApiResponse.list.map(function(value){
                return {
                    'min': value.temp.min,
                    'max': value.temp.max,
                    'main': value.weather[0].main,
                    'description': value.weather[0].description
                }
            });
            console.log(forecast);

            return forecast;
        },
        transformWeatherToPressure: function (weatherApiResponse){
            return weatherApiResponse.list.reduce(function(a, b){
                return a.pressure + b.pressure;
            }) / weatherApiResponse.list.length
        }
    }
}])
;

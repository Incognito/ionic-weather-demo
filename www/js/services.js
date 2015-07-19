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
                        if (!data.cod && data.cod !== 200) { // Openweathermap doesn't return meaningful status codes
                            reject('Bad response code: ' + data.cod)
                        }
                        resolve(data)
                    })
                    .error(function(){
                        reject('Bad request')
                    })
                ;
            });
        }
    };
}])
.factory('WeatherTransformer', [function(){
    return {
        transformWeatherToForecast: function (weather){
            var forecast = weather.list.map(function(value){
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
        transformWeatherToPressure: function (weather){
            var sum = weather.list.reduce(function(a, b){
                return a + b.pressure;
            }, 0);

            return sum / weather.list.length
        }
    }
}])
.service('SearchService', function() {
    var presentState;
    var subscribers = [];
    return {
        publish: function(state) {
            presentState = state;
            subscribers.forEach(function(callback){
                callback(presentState);
            });
        },
        subscribe: function(callback) {
            subscribers.push(callback);
            callback(presentState);
        }
    };
})
;

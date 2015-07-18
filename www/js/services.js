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
                        resolve(data)
                    })
                    .error(function(){
                        reject()
                    })
            });
        }
    };
}])
;


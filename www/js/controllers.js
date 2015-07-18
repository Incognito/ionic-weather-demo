angular.module('starter.controllers', [])

.controller('SevenDayCtrl', function($scope, WeatherClient) {
  $scope.city = 'Toronto'
  var forecast = WeatherClient.getWeeklyForecastByCity($scope.city);
  forecast.then(function resolve(){
    
  });
})

.controller('FancySevenDayCtrl', function($scope, WeatherClient) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var forecast = WeatherClient.getWeeklyForecastByCity($scope.city);
  forecast.then(function resolve(){
    
  });

})

.controller('PressureCtrl', function($scope, WeatherClient) {
  $scope.settings = {
  };
});

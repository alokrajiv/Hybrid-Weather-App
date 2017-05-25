angular.module('WeatherApp', [
  'ngRoute',
  'mobile-angular-ui',
  'WeatherApp.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {templateUrl:'home.html',  reloadOnSearch: false})
    .when('/trial', {templateUrl:'trial.html',  reloadOnSearch: false});
});
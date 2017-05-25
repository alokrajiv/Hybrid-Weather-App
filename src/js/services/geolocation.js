angular.module('WeatherApp.services.Geolocation', [
	'WeatherApp.services.Cordova'
])
	.factory('getCurrentPosition', function (deviceReady, $document, $window, $rootScope) {
		return function (done) {
			deviceReady(function () {
				navigator.geolocation.getCurrentPosition(function (position) {
					$rootScope.$apply(function () {
						done(position);
					});
				}, function (error) {
					$rootScope.$apply(function () {
						done(new Error('Unable to retreive position'));
					});
				},
				{timeout: 3000});
			});
		};
	});
/* global done */
angular.module('WeatherApp.controllers.Main', [
	'WeatherApp.services.Geolocation',
	'WeatherApp.services.Forecast',
	'WeatherApp.services.Alerter'
])

	.controller('MainController', function ($scope, $location) {
		$location.url('/');
	})

	.controller('HomeController', function ($scope, getCurrentPosition, getWeather, showAlertBox) {

		$scope.load_status = "CHECK";
		$scope.location = "location";
		$scope.weather = "weather";
		$scope.holdVal = function () {
			$scope.location = "loading";
			$scope.weather = "loading";
		}
		$scope.load = function () {
			$scope.holdVal();
			$scope.load_status = "Locating...";
			getCurrentPosition(function (position) {
				if (position instanceof Error) {
					$scope.load_status = "Error! RE-CHECK";
					showAlertBox(
						'We are unable to get your location!\nIs location Services switched on..?',  // message
						function () {

						},         // callback
						'Where are you?',            // title
						'Close'                  // buttonName
						);
					return;
				}
				$scope.location = position.coords.latitude + "," + position.coords.longitude;
				$scope.load_status = "Searching...";
				getWeather(
					position.coords.latitude,
					position.coords.longitude,
					function (location, weather, icon) {
						$scope.load_status = "Loading...";
						$scope.location = location;
						$scope.weather = weather;
						$scope.icon_code = icon;
						$scope.load_status = "RE-CHECK";
					});
			});
		}
		$scope.load();
	})

	.controller('TrialController', function ($scope, getCurrentPosition, getWeather) {
		$scope.test_val = "lorem";
		$scope.op_status = "Attack";
		$scope.attack = function () {
			$scope.op_status = "Operating";
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}

		// onSuccess Geolocation
		//
		function onSuccess(position) {
			var element = document.getElementById('onscreenConsole1');
			element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
			'Longitude: ' + position.coords.longitude + '<br />' +
			'Altitude: ' + position.coords.altitude + '<br />' +
			'Accuracy: ' + position.coords.accuracy + '<br />' +
			'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
			'Heading: ' + position.coords.heading + '<br />' +
			'Speed: ' + position.coords.speed + '<br />' +
			'Timestamp: ' + position.timestamp + '<br />';
			$scope.op_status = "Attack";
		}

		// onError Callback receives a PositionError object
		//
		function onError(error) {
			$scope.op_status = "Error";
			var element = document.getElementById('onscreenConsole2');
			element.innerHTML = ('code: ' + error.code + '\n' +
				'message: ' + error.message + '\n');
			$scope.op_status = "Error";
		}

	});

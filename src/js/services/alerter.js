angular.module('WeatherApp.services.Alerter', [])
	.factory('showAlertBox', function (deviceReady, $document, $window, $rootScope) {
		return function (message,done,title,buttonName) {
			navigator.notification.alert(
				message,  
				done,         // callback
				title,            // title
				buttonName                  // buttonName
				);
		};
	});
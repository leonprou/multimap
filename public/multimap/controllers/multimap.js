/* global google */


'use strict';

// var io = io()

// io.on('near users', function(msg) {
// 	console.log('message: ' + msg);
// });


angular.module('multimap').controller('MultimapController', ['$scope', '$rootScope', '$location', 'Global', 'Users', 'Socket',
	function($scope, $rootScope, $location, Global, Users, Socket) {

		//private variables
		var defaultLoc = {
			latitude: 40.729884,
			longitude: -73.990988
		};

		var map;
		var panorama;


		//variables on scope
		$scope.controller = {};
		$scope.global = Global;
		$scope.user = $scope.global.user;
		$scope.user.location = $scope.user.location || defaultLoc;
		$scope.mapOptions = {
			center: {
				latitude: $scope.user.location.latitude,
				longitude: $scope.user.location.longitude
			},
			zoom: 14
		};

		$scope.$watch('$viewContentLoaded', function() {
			if (map === undefined) {

				map = $scope.controller.getGMap();
				panorama = map.getStreetView();
				// panorama.setPosition({lat: $scope.user.location.latitude, lng: $scope.user.location.longitude});

				google.maps.event.addListener(panorama, 'position_changed', function() {
					if (panorama.getVisible() === true) {
						$scope.user.location.latitude = panorama.getPosition().lat();
						$scope.user.location.longitude = panorama.getPosition().lng();
						Socket.emit('update', $scope.user);
					}
				});
			}
		});

		Socket.on('near users', function(users) {
			$scope.users = users;
		});
	}
]);
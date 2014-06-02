/* global google */

'use strict';

angular.module('multimap').controller('MultimapController', ['$scope', '$rootScope', '$location', 'Global', 'Users',
	function($scope, $rootScope, $location, Global, Users) {
		$scope.global = Global;
		$scope.users = Users;

		var defaultLoc = {
				latitude: 40.729884,
				longitude: -73.990988
		};

		$scope.user = $scope.global.user;
		$scope.user.location = $scope.user.location || defaultLoc;
		$scope.mapOptions = {
			center: $scope.user.location,
			zoom: 8
		};

		$scope.markers = [];
		$scope.controller = {};

		var map;
		var panorama;


		$scope.$watch('$viewContentLoaded', function() {
			if (map === undefined) {
				map = $scope.controller.getGMap();
				panorama = map.getStreetView();
				panorama.setPosition({lat: $scope.user.location.latitude, lng: $scope.user.location.longitude});

				google.maps.event.addListener(panorama, 'position_changed', function() {
					if (panorama.getVisible() === true) {
						$scope.user.location.latitude = panorama.getPosition().lat();
						$scope.user.location.longitude = panorama.getPosition().lng();
						$scope.update();
					}
				});
			}
		});

		$scope.update = function() {
			var servUser = new Users($scope.user);

			servUser.$update(function() {
				$location.path('users/' + $scope.user._id);
			});
		};


		$scope.toggleStreetView = function() {
			var toggle = panorama.getVisible();
			if (toggle === false) {
				panorama.setVisible(true);
			} else {
				panorama.setVisible(false);
			}
		};
	}
]);
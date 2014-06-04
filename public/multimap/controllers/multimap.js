/* global google */

'use strict';
var io = io.connect();

angular.module('multimap').controller('MultimapController', ['$scope', '$rootScope', '$location', 'Global', 'Users',
	function($scope, $rootScope, $location, Global, Users) {

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
				Users.near({
					userId: $scope.user._id
				}, $scope.user, function(users) {
					$scope.users = users;
				});
				map = $scope.controller.getGMap();
				panorama = map.getStreetView();

				google.maps.event.addListener(panorama, 'position_changed', function() {
					if (panorama.getVisible() === true) {
						$scope.user.location.latitude = panorama.getPosition().lat();
						$scope.user.location.longitude = panorama.getPosition().lng();
						Users.update({
							userId: $scope.user._id
						}, $scope.user, function() {
							$scope.users.forEach(function(elem) {
								if (elem._id === $scope.user._id) {
									elem.location = $scope.user.location;
								}
							});
						});
					}
				});
			}
		});

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
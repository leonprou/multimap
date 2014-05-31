/* global google */

'use strict';

angular.module('multimap').controller('MultimapController', ['$scope', 'Global',
 function ($scope, Global) {
	$scope.global = Global;

	 $scope.mapOptions = {
			center: {
			latitude: 40.729884,
			longitude: -73.990988
		},
			zoom: 8
			// streetViewControl: false
	};

	$scope.controller = {};

	var map;
	var panorama;
	$scope.myCoords = new google.maps.LatLng($scope.mapOptions.center.latitude,
	 $scope.mapOptions.center.longitude);
	
  $scope.$watch('$viewContentLoaded', function()
  {
  	if (map === undefined) {
	    map = $scope.controller.getGMap();
	    panorama = map.getStreetView();
	    panorama.setPosition($scope.myCoords);

      google.maps.event.addListener(panorama, 'position_changed', function() {
      	if (panorama.getVisible() === true) {
      		//write to DB here
		      $scope.myCoords = panorama.getPosition();
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
}]);
'use strict';

angular.module('multimap').controller('MultimapController', ['$scope', 'Global',
 function ($scope, Global) {
	$scope.global = Global;

	 $scope.mapOptions = {
			center: {
			latitude: 45,
			longitude: -73,
		},
			zoom: 8
			// streetViewControl: false
	};

	$scope.controller = {};

	var map;
	var panorama;
	
  $scope.$watch('$viewContentLoaded', function()
  {
    map = $scope.controller.getGMap();
    panorama = map.getStreetView();
    panorama.setPosition($scope.mapOptions.center);
		  panorama.setPov(({
	    heading: 265,
	    pitch: 0
	  }));

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
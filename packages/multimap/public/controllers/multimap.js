'use strict';

angular.module('mean.multimap').controller('MultimapController', ['$scope', 'Global',
    function($scope, Global, Multimap) {
        $scope.global = Global;
        $scope.package = {
            name: 'multimap'
        };

        $scope.map = {
		    center: {
	        latitude: 45,
	        longitude: -73
		    },
	    zoom: 8
		};
    }
]);

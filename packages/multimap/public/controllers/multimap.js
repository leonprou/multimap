'use strict';

angular.module('mean.multimap').controller('MultimapController', ['$scope', 'Global',
    function($scope, Global, Multimap) {
        $scope.global = Global;
        $scope.package = {
            name: 'multimap'
        };
    }
]);

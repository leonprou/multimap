'use strict';

angular.module('mean.multimap').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('multimap', {
            url: '/multimap/example',
            templateUrl: 'multimap/views/index.html'
        });
    }
]);

'use strict';

angular.module('mean.multimap').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('multimap', {
            url: '/',
            templateUrl: 'multimap/views/index.html'
        });
    }
]);

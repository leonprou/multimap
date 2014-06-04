'use strict';

//Setting up route
angular.module('multimap').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            $urlRouterProvider.otherwise('/');

            // states for my multimap
            // $stateProvider              
            //     .state('home', {
            //         url: '/',
            //         templateUrl: 'public/multimap/views/index.html'
            // });
        }
    ])
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

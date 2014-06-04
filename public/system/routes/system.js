'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider
            .state('home', {
                url: '/',
                controller: ['$scope', '$state', 'Global',
                    function($scope, $state, Global) {
                        if (Global.authenticated)
                            $state.go('home.user');
                        else
                            $state.go('home.anon');
                    }
                ],
                template: '<ui-view>'
            })
            .state('home.user', {
                templateUrl: 'public/multimap/views/index.html'
            })
            .state('home.anon', {
                templateUrl: 'public/system/views/index.html'
            })
            .state('auth', {
                templateUrl: 'public/auth/views/index.html'
            });
    }
])
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

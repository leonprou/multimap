'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider', '$injector',
    function($stateProvider, $urlRouterProvider, $injector) {
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



// onEnter: function() {
//     // var GlobalProvider = $injector.get('GlobalProvider');
//     // var Global = $injector.invoke(GlobalProvider.$get[0]);
//     // console.log(Global.user);
//     // var $state = $injector.get('$state');
//     // if (Global.authenticated) {
//     //     $state.go('home.user');
//     // } else {
//     //     $state.go('home.anon');
//     // }
// }
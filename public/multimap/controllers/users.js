'use strict';

angular.module('multimap').controller('UsersController', ['$scope', '$stateParams', '$location', 'Global', 'Users',
    function($scope, $stateParams, $location, Global, Users) {
        $scope.global = Global;


        $scope.update = function() {
            var user = $scope.user;

            user.$update(function() {
                $location.path('users/' + user._id);
            });
        };
    }
]);
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmAuthBarController', function($scope) {
        $scope.loggedIn = false;

        $scope.toggleLoggedIn = function() {
            $scope.loggedIn = !$scope.loggedIn;
        };
    });

} (window.angular));
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmAuthBarController', function($scope, jmUserAuthService) {
        $scope.isLoggedIn = function() {
            return jmUserAuthService.isLoggedIn();
        };

        $scope.getEmail = function() {
            return  jmUserAuthService.getLoggedInUserEmail();
        };

        $scope.login = function(email) {
            jmUserAuthService.login(email, 'TEDDY');
        };

        $scope.logout = function() {
            jmUserAuthService.logout();
        };
    });

} (window.angular));
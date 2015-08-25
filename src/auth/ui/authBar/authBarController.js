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

        $scope.logout = function() {
            jmUserAuthService.logout();
        };

        $scope.status = {
            isopen: false
        };

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
    });

} (window.angular));
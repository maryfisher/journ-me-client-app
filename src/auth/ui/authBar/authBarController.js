// @require auth.auth
// @require auth.service.userAuthService
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmAuthBarController', function($scope, jmUserAuthService, jmUserAuthVO) {
        $scope.user = jmUserAuthVO;

        $scope.logout = function() {
            jmUserAuthService.logout();
        };
    });

} (window.angular));
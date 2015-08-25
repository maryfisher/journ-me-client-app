(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmLoginController', function($scope, jmUserAuthService, $modalInstance) {

        $scope.login = function(email, password) {
            jmUserAuthService.login(email, password);
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

} (window.angular));
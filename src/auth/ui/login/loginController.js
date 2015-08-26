(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmLoginController', function($scope, jmUserAuthService, $modalInstance, $location, jmUserAuthVO) {

        $scope.login = function(email, password) {
            jmUserAuthService.login(email, password).then(function () {
                $location.path('/user/' + jmUserAuthVO.id);
                $modalInstance.close();
            }, function () {

            });

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        
        $scope.forgotPW = function () {
            
        };
    });

} (window.angular));
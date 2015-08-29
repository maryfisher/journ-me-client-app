// @require auth.auth
// @require auth.service.userAuthService
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmLoginController', function($scope, jmUserAuthService, $modalInstance, jmUserAuthVO) {

        $scope.login = function(email, password) {
            jmUserAuthService.login(email, password).then(function () {
                if(jmUserAuthVO.isLoggedIn()){
                    $modalInstance.close();
                }
            }, function () {
                $scope.loginForm.password.$setValidity('pw', false);
            });

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        
        $scope.forgotPW = function () {
            
        };
    });

} (window.angular));
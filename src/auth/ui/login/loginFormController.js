// @require auth.auth
// @require auth.service.userAuthService
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmLoginFormController', function ($scope, jmUserAuthService, $modalInstance, jmUserAuthVO, jmRouteUtil){

        $scope.rememberMe = true;

        $scope.hasInvalidEmail = function () {
            return $scope.loginForm.email.$invalid && $scope.loginForm.email.$touched;
        };

        $scope.login = function () {
            jmUserAuthService.login($scope.email, $scope.password, $scope.rememberMe).then(
                function () {
                    if (jmUserAuthVO.isLoggedIn()) {
                        $scope.loginForm.$setValidity('pw', true);
                        jmRouteUtil.reload();
                        $modalInstance.close();
                    }
                }, function () {
                    $scope.loginForm.$setValidity('pw', false);
                }
            );

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.forgotPW = function () {

        };
    });

}(window.angular));
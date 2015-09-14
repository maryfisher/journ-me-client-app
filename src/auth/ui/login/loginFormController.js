// @require auth.auth
// @require auth.service.authService
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmLoginFormController', function ($scope, $modalInstance, jmAuthModel, jmRouteUtil) {

        $scope.rememberMe = true;

        $scope.hasInvalidEmail = function () {
            return $scope.loginForm.email.$invalid && $scope.loginForm.email.$touched;
        };

        $scope.login = function () {
            jmAuthModel.login($scope.email, $scope.password, $scope.rememberMe).then(
                function () {
                    if (jmAuthModel.isLoggedIn()) {
                        $scope.loginForm.$setValidity('pw', true);
                        jmRouteUtil.reload();
                        $modalInstance.close();
                    }
                },
                function () {
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
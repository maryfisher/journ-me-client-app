// @require auth.auth
// @require auth.service.authService
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmRegisterFormController', function ($scope, jmAuthModel, $modalInstance, jmRouteUtil) {

        $scope.hasValidName = function () {
            return $scope.registerForm.name.$invalid && $scope.registerForm.name.$touched;
        };

        $scope.hasValidEmail = function () {
            return $scope.registerForm.email.$invalid && $scope.registerForm.email.$touched;
        };

        $scope.hasDiffPasswords = function () {
            if (!$scope.password || !$scope.password2 || !$scope.registerForm.$submitted) {
                return false;
            }
            return $scope.password !== $scope.password2;
        };

        $scope.register = function () {
            jmAuthModel.register($scope.email, $scope.password, $scope.name).then(
                function () {
                    if (jmAuthModel.isLoggedIn()) {
                        $scope.registerForm.email.$setValidity('emailTaken', true);
                        jmRouteUtil.redirectTo(jmRouteUtil.routeConst.DASHBOARD);
                        $modalInstance.close();
                    }
                },
                function () {
                    $scope.loginForm.password.$setValidity('emailTaken', false);
                }
            );

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

}(window.angular));
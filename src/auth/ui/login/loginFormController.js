// @require auth.auth
// @require auth.service.userAuthService
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmLoginFormController', function ($scope, jmUserAuthService, $modalInstance, jmUserAuthVO, $route){//jmRouteUtil, $location) {

        $scope.hasValidEmail = function () {
            return $scope.loginForm.email.$invalid && $scope.loginForm.email.$touched;
        };

        $scope.login = function () {
            jmUserAuthService.login($scope.email, $scope.password).then(
                function () {
                    if (jmUserAuthVO.isLoggedIn()) {
                        $scope.loginForm.password.$setValidity('pw', true);
                        /*if ($location.path() === jmRouteUtil.routeConst.HOME_PATH) {
                            jmRouteUtil.redirectTo(jmRouteUtil.routeConst.DASHBOARD_PATH);
                        }*/
                        $route.reload();
                        $modalInstance.close();
                    }
                }, function () {
                    $scope.loginForm.password.$setValidity('pw', false);
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
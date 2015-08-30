// @require auth.auth
// @require auth.service.userAuthService
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.controller('jmLoginFormController', function ($scope, jmUserAuthService, $modalInstance, jmUserAuthVO, jmRouteUtil) {

        $scope.login = function (email, password) {
            jmUserAuthService.login(email, password).then(
                function () {
                    if (jmUserAuthVO.isLoggedIn()) {
                        $scope.loginForm.password.$setValidity('pw', true);
                        jmRouteUtil.redirectTo(jmRouteUtil.routeConst.DASHBOARD_PATH);
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
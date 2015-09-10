// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.directive('jmAuthBar', function (jmUserAuthService, jmUserAuthVO, jmAliasVO, jmRouteUtil) {
        return {
            templateUrl: 'auth/ui/authBar/authBar.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {},
            link: function (scope) {
                scope.user = jmUserAuthVO;
                scope.alias = jmAliasVO;

                scope.logout = function () {
                    jmUserAuthService.logout().finally(
                        function () {
                            if (!jmUserAuthVO.isLoggedIn()) {
                                jmRouteUtil.reload();
                            }
                        }
                    );
                };
            }
        };
    });

}(window.angular));
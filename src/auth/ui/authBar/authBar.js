// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.directive('jmAuthBar', function(jmUserAuthService, jmUserAuthVO, jmRouteUtil) {
        return {
            templateUrl: 'auth/ui/authBar/authBar.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            link: function(scope) {
                scope.user = jmUserAuthVO;

                scope.logout = function () {
                    jmUserAuthService.logout().finally(
                        function () {
                            if (!jmUserAuthVO.isLoggedIn()) {
                                jmRouteUtil.redirectTo(jmRouteUtil.routeConst.HOME_PATH);
                            }
                        }
                    );
                };
            }
        };
    });

} (window.angular));
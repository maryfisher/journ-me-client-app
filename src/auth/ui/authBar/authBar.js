// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.directive('jmAuthBar', function(jmUserAuthService, jmUserAuthVO, $route){//, $location, jmRouteUtil){
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
                            if (!jmUserAuthVO.isLoggedIn()){// && $location.path() === jmRouteUtil.routeConst.DASHBOARD_PATH) {
                                //jmRouteUtil.redirectTo(jmRouteUtil.routeConst.HOME_PATH);
                                $route.reload();
                            }
                        }
                    );
                };
            }
        };
    });

} (window.angular));
// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.directive('jmAuthBar', function(jmUserAuthService, jmUserAuthVO, $route){
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
                            if (!jmUserAuthVO.isLoggedIn()){
                                $route.reload();
                            }
                        }
                    );
                };
            }
        };
    });

} (window.angular));
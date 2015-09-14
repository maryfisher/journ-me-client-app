// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.directive('jmAuthBar', function (jmAuthModel, jmAliasModel, jmRouteUtil) {
        return {
            templateUrl: 'auth/ui/authBar/authBar.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {},
            link: function (scope) {
                scope.user = jmAuthModel.currentUser;
                scope.alias = jmAliasModel.getCurrentAlias();

                scope.logout = function () {
                    jmAuthModel.logout().then(
                        function () {
                            if (!jmAuthModel.isLoggedIn()) {
                                jmRouteUtil.reload();
                            }
                        }
                    );
                };
            }
        };
    });

}(window.angular));
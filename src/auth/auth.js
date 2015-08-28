// @require app
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth', []);

    //to redirect from home to dashboard when user is logged in
    //to redirect from dashboard to home when user is not logged in (== deny access)
    app.run(function ($rootScope, $location, jmUserAuthVO, jmRouteUtil) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (!jmUserAuthVO.isLoggedIn() && next.requiresLogin) {
                $location.path(jmRouteUtil.routeConst.HOME);
            }else if (jmUserAuthVO.isLoggedIn() && next.redirect) {
                $location.path(jmRouteUtil.getUser());
            }
        });
    });


} (window.angular));
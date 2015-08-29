
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmApp', [
        'ngRoute',
        'ui.bootstrap',
        'jmAuth',
        'jmUser',
        'jmCommon'
    ]);

    app.config(function ($routeProvider, jmRouteConst) {
        $routeProvider.when(jmRouteConst.HOME_PATH, {
            templateUrl: 'public/ui/home/home.tpl.html',
            redirectIfAuthenticated: true,
            redirectUrl: jmRouteConst.DASHBOARD_PATH
        });
        $routeProvider.when(jmRouteConst.BROWSER_PATH, {
            templateUrl: 'public/ui/browse/browse.tpl.html'
        });
        $routeProvider.when(jmRouteConst.DASHBOARD_PATH, {
            templateUrl: 'user/ui/dashboard/dashboard.tpl.html',
            redirectIfUnauthenticated: true,
            redirectUrl: jmRouteConst.HOME_PATH
        });
        $routeProvider.otherwise({redirectTo: jmRouteConst.HOME_PATH});
    });

    app.run(function ($rootScope, $location, jmUserAuthVO) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (!jmUserAuthVO.isLoggedIn() && next.redirectIfUnauthenticated) {
                $location.path(next.redirectUrl);
            } else if (jmUserAuthVO.isLoggedIn() && next.redirectIfAuthenticated) {
                $location.path(next.redirectUrl);
            }
        });
    });

} (window.angular));
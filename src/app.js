
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmApp', [
        'ngRoute',
        'ui.bootstrap',
        'ngCookies',
        'ngResource',
        'jmAuth',
        'jmUser',
        'jmJourney',
        'jmCommon'
    ]);

    app.config(function ($routeProvider, jmRouteConst) {
        $routeProvider.when(jmRouteConst.HOME_PATH, {
            templateUrl: 'public/ui/home/home.tpl.html',
            redirectIfAuthenticated: true,
            redirectUrl: jmRouteConst.DASHBOARD_PATH
        });
        $routeProvider.when(jmRouteConst.BROWSE_PATH, {
            templateUrl: 'public/ui/browse/browse.tpl.html'
        });
        $routeProvider.when(jmRouteConst.DASHBOARD_PATH, {
            templateUrl: 'user/ui/dashboard/dashboard.tpl.html',
            redirectIfUnauthenticated: true,
            redirectUrl: jmRouteConst.HOME_PATH,
            controller: 'jmDashboardController'
        });
        $routeProvider.when(jmRouteConst.JOURNEY_DETAIL_PATH, {
            templateUrl: 'journey/ui/detail/journeyDetail.tpl.html',
            controller: 'jmJourneyDetailController'
        });
        $routeProvider.otherwise({redirectTo: jmRouteConst.HOME_PATH});
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('jmAuthTokenIntercept');
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
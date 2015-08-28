
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmClient', [
        'ngRoute',
        'ui.bootstrap',
        'jmAuth',
        'jmUser',
        'jmCommon'
    ]);

    app.config(function ($routeProvider, jmRouteConst) {
        //$locationProvider.html5Mode(true); -- hashbang mode seems easier to understand
        $routeProvider.when(jmRouteConst.HOME, {
            templateUrl: 'public/ui/home/home.tpl.html',
            redirect: true
        });
        $routeProvider.when(jmRouteConst.BROWSE, {templateUrl: 'public/ui/browse/browse.tpl.html'});
        $routeProvider.when(jmRouteConst.USER_PATH, {
            templateUrl: 'user/ui/dashboard/dashboard.tpl.html',
            requiresLogin: true
        });
        $routeProvider.otherwise({redirectTo:'/home'});
    });

} (window.angular));
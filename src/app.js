(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmClient', [
        'ngRoute',
        'jmAuth'
    ]);

    app.config(function ($routeProvider) {
        //$locationProvider.html5Mode(true); -- hashbang mode seems easier to understand
        $routeProvider.when('/home', {templateUrl: 'public/ui/home/home.tpl.html'});
        $routeProvider.when('/browse', {templateUrl: 'public/ui/browse/browse.tpl.html'});
        $routeProvider.otherwise({redirectTo:'/home'});
    });

} (window.angular));
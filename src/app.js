(function(angular, undefined) {
    'use strict';

    var app = angular.module('JournMeClient', [
        'ngRoute'
    ]);

    app.config(function ($routeProvider) {
        //$locationProvider.html5Mode(true); -- hashbang mode seems easier to understand
        $routeProvider.when('/home', {template: '<div>HI!</div>'});
        $routeProvider.when('/browse', {templateUrl: 'ui/browse/browse.tpl.html'});
        $routeProvider.otherwise({redirectTo:'/home'});
    });


} (window.angular));
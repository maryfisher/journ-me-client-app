(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.directive('jmLogin', function($modal) {
        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element) {
                element.on('click', function() {
                    $modal.open({
                        animation: true,
                        templateUrl: 'auth/ui/login/login.tpl.html',
                        controller: 'jmLoginController'
                    });
                });
            }
        };
    });

} (window.angular));
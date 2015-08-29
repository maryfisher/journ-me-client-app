// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.directive('jmLogin', function($modal) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    $modal.open({
                        animation: true,
                        templateUrl: 'auth/ui/login/loginForm.tpl.html',
                        controller: 'jmLoginFormController'
                    });
                });
            }
        };
    });

} (window.angular));
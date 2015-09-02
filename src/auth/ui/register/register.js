// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmAuth');

    app.directive('jmRegister', function($modal) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    $modal.open({
                        animation: true,
                        templateUrl: 'auth/ui/register/registerForm.tpl.html',
                        controller: 'jmRegisterFormController'
                    });
                });
            }
        };
    });

} (window.angular));
// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var module = angular.module('jmAuth');

    module.directive('jmLoggedInShow', function(jmUserAuthVO, $animate) {
        return {
            restrict: 'A',
            multiElement: true,
            link: function(scope, element, attr) {
                scope.$watch(attr.jmLoggedIn, function () {
                    $animate[jmUserAuthVO.isLoggedIn() ? 'removeClass' : 'addClass'](element, 'ng-hide', {
                        tempClasses: 'ng-hide-animate'
                    });
                });
            }
        };
    });

} (window.angular));
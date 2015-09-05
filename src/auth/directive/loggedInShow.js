// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var module = angular.module('jmAuth');

    module.directive('jmLoggedInShow', function(jmUserAuthVO, $animate) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var show = attr.jmLoggedInShow === 'true';
                scope.$watch(function () {
                    return jmUserAuthVO.isLoggedIn();
                }, function () {
                    var remove = (jmUserAuthVO.isLoggedIn() && !show) || (!jmUserAuthVO.isLoggedIn() && show);
                    $animate[remove ? 'addClass': 'removeClass'](element, 'ng-hide', {
                        tempClasses: 'ng-hide-animate'
                    });
                });
            }
        };
    });

} (window.angular));
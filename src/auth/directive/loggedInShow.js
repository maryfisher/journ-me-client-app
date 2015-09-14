// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var module = angular.module('jmAuth');

    module.directive('jmLoggedInShow', function (jmAuthModel, $animate) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var show = attr.jmLoggedInShow === 'true';
                scope.$watch(function () {
                    return jmAuthModel.isLoggedIn();
                }, function () {
                    var remove = (jmAuthModel.isLoggedIn() && !show) || (!jmAuthModel.isLoggedIn() && show);
                    $animate[remove ? 'addClass' : 'removeClass'](element, 'ng-hide', {
                        tempClasses: 'ng-hide-animate'
                    });
                });
            }
        };
    });

}(window.angular));
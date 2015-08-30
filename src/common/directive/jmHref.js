// @require common.common
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmCommon');

    app.directive('jmHref', function(jmRouteUtil) {
        return {
            restrict: 'A',
            compile: function (element, attrs) {
                var pathConstName = attrs.jmHref;
                attrs.$set('href', jmRouteUtil.getHrefPath(pathConstName));
            }
        };
    });

} (window.angular));
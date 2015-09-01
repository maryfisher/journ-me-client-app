// @require common.common
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmCommon');

    app.directive('jmJourneyHref', function(jmRouteUtil) {
        return {
            restrict: 'A',
            scope: {id: '@jmJourneyHref'},
            link: function (scope, element, attrs) {
                var journeyId = scope.id;
                attrs.$set('href', jmRouteUtil.getJourneyPath(journeyId));
            }
        };
    });

} (window.angular));
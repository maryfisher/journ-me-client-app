// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.directive('jmJourneyListItem', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                journeyStr: '@jmJourney'
            },
            templateUrl: 'journey/ui/list/journeyListItem.tpl.html',
            link: function (scope) {
                scope.journey = JSON.parse(scope.journeyStr);
            }
        };
    });

}(window.angular));
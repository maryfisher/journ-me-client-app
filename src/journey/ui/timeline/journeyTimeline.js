// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.directive('jmJourneyTimeline', function () {
        return {
            templateUrl: 'journey/ui/timeline/journeyTimeline.tpl.html',
            restrict: 'E',
            replace: true,
            scope: {
                journeyId: '=',
                isSelected: '@'
            },
            controller: 'jmJourneyTimelineController'
        };
    });

}(window.angular));
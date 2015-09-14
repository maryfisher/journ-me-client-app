// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.directive('jmLinkJourney', function ($modal) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element) {
                element.on('click', function () {
                    element[0].blur();
                    $modal.open({
                        animation: true,
                        templateUrl: 'journey/ui/link/linkJourney.tpl.html',
                        controller: 'jmLinkJourneyController'
                    });
                });
            }
        };
    });

}(window.angular));
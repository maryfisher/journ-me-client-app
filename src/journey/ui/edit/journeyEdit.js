// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.directive('jmJourneyEdit', function ($modal) {
        return {
            restrict: 'A',
            scope: {
                journey: '@jmJourneyEdit'
            },
            link: function (scope, element) {
                element.on('click', function () {
                    element[0].blur();
                    $modal.open({
                        animation: true,
                        templateUrl: 'journey/ui/edit/journeyForm.tpl.html',
                        controller: 'jmJourneyFormController',
                        scope: scope
                    });
                });
            }
        };
    });

}(window.angular));
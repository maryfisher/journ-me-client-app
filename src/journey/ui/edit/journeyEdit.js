// @require journey.journey
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.directive('jmJourneyEdit', function($modal) {
        return {
            restrict: 'A',
            scope: {journeyId: '@jmJourneyEdit'},
            link: function(scope, element) {
                element.on('click', function() {
                    $modal.open({
                        animation: true,
                        templateUrl: 'journey/ui/edit/journeyForm.tpl.html',
                        controller: 'jmJourneyFormController',
                        resolve: {
                            journeyId: function () {
                                return scope.journeyId;
                            }
                        }
                    });
                });
            }
        };
    });

} (window.angular));
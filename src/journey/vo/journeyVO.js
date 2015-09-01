// @require journey.journey
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmJourney');

    auth.value('jmJourneyVO', {
        id: undefined,
        name: undefined,
        descript: undefined,
        invalidateJourney: function() {
            this.name = undefined;
            this.id = undefined;
            this.descript = undefined;
        },
        setJourney: function (response) {
            this.name = response.name;
            this.id = response.id;
            this.descript = response.descript;
        }
    });


} (window.angular));
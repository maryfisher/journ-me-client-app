// @require journey.journey
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmJourney');

    auth.value('jmJourneyVO', {
        id: undefined,
        name: undefined,
        descript: undefined,
        hasLocation: false,
        location: undefined,
        isPublic: true,
        join: 'all',
        isUser: false,
        moments: [],
        invalidateJourney: function() {
            this.name = undefined;
            this.id = undefined;
            this.descript = undefined;
            this.hasLocation = false;
            this.location = undefined;
            this.isPublic = true;
            this.join = 'all';
            this.isUser = false;
            this.moments = [];
        },
        setJourney: function (response) {
            this.name = response.name;
            this.id = response.id;
            this.descript = response.descript;
            this.hasLocation = response.hasLocation || false;
            this.location = response.location;
            this.isPublic = response.isPublic || true;
            this.join = response.join || 'all';
            this.isUser = true;
            this.moments = response.moments;
        },
        getEmptyJourney: function(){
            return {
                id: undefined,
                name: undefined,
                descript: undefined,
                hasLocation: false,
                location: undefined,
                isPublic: true,
                join: 'all',
                isUser: false,
                moments: []
            };
        }
    });


} (window.angular));
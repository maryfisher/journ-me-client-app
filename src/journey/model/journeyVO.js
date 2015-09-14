// @require journey.journey
(function (angular, undefined) {
    'use strict';

    var auth = angular.module('jmJourney');

    auth.value('jmJourneyVO', {
        _id: undefined,
        name: undefined,
        descript: undefined,
        hasLocation: false,
        location: undefined,
        isPublic: true,
        join: 'all',
        isUser: false,
        moments: [],
        alias: undefined,
        followers: [],
        invalidateJourney: function () {
            this.name = undefined;
            this._id = undefined;
            this.descript = undefined;
            this.hasLocation = false;
            this.location = undefined;
            this.isPublic = true;
            this.join = 'all';
            this.isUser = false;
            this.moments = undefined;
            this.alias = undefined;
            this.followers = undefined;
        },
        setJourney: function (response) {
            this.name = response.name;
            this._id = response._id;
            this.descript = response.descript;
            this.hasLocation = response.hasLocation || false;
            this.location = response.location;
            this.isPublic = response.isPublic || true;
            this.join = response.join || 'all';
            this.isUser = true;
            this.moments = response.moments;
            this.alias = response.alias;
            this.followers = response.followers;
        }
    });


}(window.angular));
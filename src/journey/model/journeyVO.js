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
        isAlias: false,
        moments: undefined,
        alias: undefined,
        followers: undefined,
        linkedToJourneys: undefined,
        linkedFromJourneys: undefined,
        joinedLinkedJourneys: undefined,
        aliasJourneyLink: undefined,
        invalidateJourney: function () {
            this.name = undefined;
            this._id = undefined;
            this.descript = undefined;
            this.hasLocation = false;
            this.location = undefined;
            this.isPublic = true;
            this.join = 'all';
            this.isAlias = false;
            this.moments = undefined;
            this.alias = undefined;
            this.followers = undefined;
            this.linkedToJourneys = undefined;
            this.linkedFromJourneys = undefined;
            this.joinedLinkedJourneys = undefined;
            this.aliasJourneyLink = undefined;
        },
        setJourney: function (response) {
            this.name = response.name;
            this._id = response._id;
            this.descript = response.descript;
            this.hasLocation = response.hasLocation || false;
            this.location = response.location;
            this.isPublic = response.isPublic || true;
            this.join = response.join || 'all';
            this.isAlias = true;
            this.moments = response.moments;
            this.alias = response.alias;
            this.followers = response.followers;
            this.linkedToJourneys = response.linkedToJourneys;
            this.linkedFromJourneys = response.linkedFromJourneys;
            this.joinedLinkedJourneys = [];
        }
    });


}(window.angular));
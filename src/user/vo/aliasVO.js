// @require user.user
(function (angular, undefined) {
    'use strict';

    var auth = angular.module('jmUser');

    auth.value('jmAliasVO', {
        id: String,
        journeys: [],
        followedJourneys: [],
        name: undefined,
        thumb: undefined,
        setAlias: function (response) {
            this.journeys = response.journeys;
            this.followedJourneys = response.followedJourneys;
            this.name = response.name;
            this.thumb = response.pic ? response.pic.data : this.thumb;
            this.id = response._id;
        },
        invalidate: function () {
            this.journeys = [];
            this.followedJourneys = [];
            this.name = undefined;
            this.id = undefined;
            this.thumb = undefined;

        }
    });


}(window.angular));
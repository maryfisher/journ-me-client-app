// @require user.user
(function (angular, undefined) {
    'use strict';

    var user = angular.module('jmUser');

    user.value('jmAliasVO', {
        _id: undefined,
        journeys: undefined,
        followedJourneys: undefined,
        name: undefined,
        thumb: undefined,
        setAlias: function (response) {
            this.journeys = response.journeys;
            this.followedJourneys = response.followedJourneys;
            this.name = response.name;
            this.thumb = response.pic ? response.pic.data : this.thumb;
            this._id = response._id;
        },
        invalidateAlias: function () {
            this.journeys = undefined;
            this.followedJourneys = undefined;
            this.name = undefined;
            this._id = undefined;
            this.thumb = undefined;

        }
    });


}(window.angular));
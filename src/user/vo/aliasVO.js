// @require user.user
(function (angular, undefined) {
    'use strict';

    var auth = angular.module('jmUser');

    auth.value('jmAliasVO', {
        id: String,
        journeys: [],
        name: undefined,
        thumb: undefined,
        setAlias: function (response) {
            this.journeys = response.journeys;
            this.name = response.name;
            this.thumb = response.pic ? response.pic.data : this.thumb;
            this.id = response._id;
        },
        invalidate: function () {
            this.journeys = [];
            this.name = undefined;
            this.id = undefined;
            this.thumb = undefined;

        }
    });


}(window.angular));
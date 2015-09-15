// @require moment.moment
(function (angular, undefined) {
    'use strict';

    var moment = angular.module('jmMoment');

    moment.value('jmMomentVO', {
        _id: undefined,
        descript: undefined,
        isAlias: false,
        alias: undefined,
        journey: undefined,
        created: undefined,
        setMoment: function (response) {
            this._id = response._id;
            this.descript = response.descript;
            this.alias = response.alias;
            this.journey = response.journey;
            this.created = response.created;
        },
        invalidateMoment: function () {
            this._id = undefined;
            this.descript = undefined;
            this.alias = undefined;
            this.journey = undefined;
            this.isAlias = false;
            this.created = undefined;
        }
    });


}(window.angular));
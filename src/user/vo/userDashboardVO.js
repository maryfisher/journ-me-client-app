// @require user.user
(function (angular, undefined) {
    'use strict';

    var auth = angular.module('jmUser');

    auth.value('jmUserDashboardVO', {
        journeys: [],
        name: undefined,
        setUser: function (response) {
            this.journeys = response.journeys;
            this.name = response.name;
        }
    });


}(window.angular));
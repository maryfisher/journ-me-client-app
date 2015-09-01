// @require user.user
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmUser');

    auth.value('jmUserDashboardVO', {
        journeys: [],
        setUser: function(response){
            this.journeys = response.journeys;
        }
    });


} (window.angular));
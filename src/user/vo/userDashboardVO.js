// @require user.user
(function(angular, undefined) {
    'use strict';

    var auth = angular.module('jmUser');

    auth.value('jmUserDashboardVO', {
        journeys: [],
        setUser: function(response){
            this.journeys = response.journeys;
        },
        getJourney: function (id) {
            for (var index = 0; index < this.journeys.length; ++index) {
                if(id === this.journeys[index].id){
                    return this.journeys[index];
                }
            }
            return null;
        },
        addJourney: function (journey) {
            var hasJourney = false;
            for (var index = 0; index < this.journeys.length; ++index) {
                if(journey.id === this.journeys[index].id){
                    hasJourney = true;
                    break;
                }
            }
            if(!hasJourney){
                this.journeys.push(journey);
            }
        }
    });


} (window.angular));
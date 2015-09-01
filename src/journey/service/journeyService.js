// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyService', function($http, $q, jmServerConst, jmJourneyVO) {

        var service = {
            getJourney: function (id) {
                return $http.get(
                    jmServerConst.JOURNEY_PATH + id
                ).then(
                    function (response) {
                        jmJourneyVO.setJourney(response.data);
                        return response;
                    },
                    function (response) {
                        jmJourneyVO.invalidateJourney();
                        return $q.reject(response);
                    }
                );
            }
        };

        return service;
    });

} (window.angular));
// @require auth.auth
(function(angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyService', function($http, $q, jmServerConst, jmJourneyVO, jmUserDashboardVO) {

        var service = {
            getJourney: function (id) {
                return $http.get(
                    jmServerConst.JOURNEY_PATH + id
                ).then(
                    function (response) {
                        jmJourneyVO.setJourney(response.data);
                        if(jmJourneyVO.isUser){
                            jmUserDashboardVO.addJourney(jmJourneyVO);
                        }
                        return response;
                    },
                    function (response) {
                        jmJourneyVO.invalidateJourney();
                        return $q.reject(response);
                    }
                );
            },
            createJourney: function (journey) {
                var json = journey;
                return $http.post(
                    jmServerConst.JOURNEY_PATH_CREATE,
                    json,
                    jmServerConst.HTTP_CONFIG
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
            },
            updateJourney: function (journey) {
                var json = journey;
                return $http.post(
                    jmServerConst.JOURNEY_PATH_UPDATE,
                    json,
                    jmServerConst.HTTP_CONFIG
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
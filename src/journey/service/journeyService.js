// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyService', function (jmServerConst, $q, jmJourneyVO, jmUserAuthVO, jmUserDashboardVO, $resource) {

        var journeyDAO = $resource(
            jmServerConst.JOURNEY_ID_PATH
        );

        return {
            getJourney: function (id) {
                return journeyDAO.get(
                    {journeyId: id},
                    function (data) {
                        jmJourneyVO.setJourney(data);
                        jmJourneyVO.isUser = (data.user === jmUserAuthVO.id);
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            },
            createJourney: function (journey) {
                journey.userId = jmUserAuthVO.id;
                return journeyDAO.save(
                    {},
                    journey,
                    function (data) {
                        jmJourneyVO.setJourney(data);
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            },
            updateJourney: function (journey) {
                return journeyDAO.save(
                    {journeyId: journey.id},
                    journey,
                    function (data) {
                        jmJourneyVO.setJourney(data);
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            }
        };
    });

}(window.angular));
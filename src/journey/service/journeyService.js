// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyService', function (jmServerConst, $q, jmJourneyVO, jmUserAuthVO, jmUserDashboardVO, $resource) {

        var journeyDAO = $resource(
            jmServerConst.JOURNEY_PATH + '/:id'
        );

        return {
            getJourney: function (id) {
                return journeyDAO.get(
                    {id: id},
                    function (data) {
                        jmJourneyVO.setJourney(data);
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
                    {id: journey.id},
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
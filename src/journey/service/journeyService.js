// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyService', function (jmServerConst, $q, jmJourneyVO, jmUserDashboardVO, $resource) {

        var journeyDAO = $resource(
            jmServerConst.JOURNEY_PATH + '/:id'
        );

        return {
            getJourney: function (id) {
                return journeyDAO.get(
                    {id: id},
                    function (data) {
                        jmJourneyVO.setJourney(data);
                        if (jmJourneyVO.isUser) {
                            jmUserDashboardVO.addJourney(jmJourneyVO);
                        }
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            },
            createJourney: function (journey) {
                return journeyDAO.save(
                    {},
                    journey,
                    function (data) {
                        journey.id = data.id;
                        jmJourneyVO.setJourney(journey);
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
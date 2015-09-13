// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyService', function (jmServerConst, $q, jmJourneyVO, jmAliasVO, $resource) {

        var journeyDAO = $resource(
            jmServerConst.JOURNEY_ID_PATH
        );

        var setJourney = function (data) {
            jmJourneyVO.setJourney(data);
            jmJourneyVO.isUser = jmJourneyVO.alias === jmAliasVO.id;
        };

        return {
            getJourney: function (id) {
                return journeyDAO.get({
                        journeyId: id
                    },
                    function (data) {
                        setJourney(data);
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            },
            createJourney: function (journey) {
                journey.aliasId = jmAliasVO.id;
                return journeyDAO.save({},
                    journey,
                    function (data) {
                        setJourney(data);
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            },
            updateJourney: function (journey) {
                return journeyDAO.save({
                        journeyId: journey.id
                    },
                    journey,
                    function (data) {
                        setJourney(data);
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
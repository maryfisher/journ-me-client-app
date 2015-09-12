// @require auth.auth
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmJourney');

    app.factory('jmJourneyService', function (jmServerConst, $q, $resource) {

        var journeyDAO = $resource(
            jmServerConst.JOURNEY_ID_PATH
        );

        return {
            getJourney: function (id) {
                return journeyDAO.get({
                        journeyId: id
                    },
                    function (data) {
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                );
            },
            createJourney: function (journey) {
                return journeyDAO.save({},
                    journey,
                    function (data) {
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            },
            updateJourney: function (journey) {
                return journeyDAO.save({
                        journeyId: journey._id
                    },
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
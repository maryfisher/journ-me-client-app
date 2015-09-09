// @require moment.moment
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmMoment');

    app.factory('jmMomentService', function (jmServerConst, $q, $resource) {
        var momentDAO = $resource(
            jmServerConst.MOMENT_ID_PATH
        );
        
        return {
            createMoment: function (moment, journeyId) {
                return momentDAO.save(
                    {journeyId: journeyId},
                    moment,
                    function (data) {
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            },
            getMoment: function (momentId, journeyId) {
                return momentDAO.get(
                    {momentId: momentId, journeyId: journeyId},
                    function (data) {
                        return data;
                    },
                    function (response) {
                        return $q.reject(response);
                    }
                ).$promise;
            },
            updateMoment: function (moment, journeyId) {
                return momentDAO.save(
                    {momentId: moment._id, journeyId: journeyId},
                    moment,
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
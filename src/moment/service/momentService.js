// @require moment.moment
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmMoment');

    app.factory('jmMomentService', function (jmServerConst, $q, $resource) {
        var momentDAO = $resource(
            jmServerConst.MOMENT_ID_PATH
        );

        var accept = function (data) {
            return data;
        };

        var reject = function (response) {
            return $q.reject(response);
        };

        return {
            getMoment: function (momentId) {
                return momentDAO.get({
                        momentId: momentId
                    },
                    accept,
                    reject
                ).$promise;
            },
            createMoment: function (moment, journeyId, aliasId) {
                return momentDAO.save({}, {
                        moment: moment,
                        journeyId: journeyId,
                        aliasId: aliasId
                    },
                    accept,
                    reject
                ).$promise;
            },
            updateMoment: function (moment) {
                return momentDAO.save({
                        momentId: moment._id
                    },
                    moment,
                    accept,
                    reject
                ).$promise;
            }
        };
    });

}(window.angular));
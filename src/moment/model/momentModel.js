// @require moment.moment
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmMoment');

    app.factory('jmMomentModel', function (jmMomentService, jmAliasVO, jmMomentVO, jmJourneyVO) {

        var setMoment = function (data) {
            jmMomentVO.setMoment(data);
            updateUser(jmMomentVO);
        };

        var updateUser = function (moment) {
            moment.isUser = moment.alias === jmAliasVO._id;
        };

        var model = {
            getCurrentMoment: function (id, journeyId) {
                if (id) {
                    if (jmMomentVO._id !== id) {
                        jmMomentVO.invalidateMoment();
                    }
                    jmMomentService.getMoment(id, journeyId, jmAliasVO._id).then(setMoment);
                }
                return jmMomentVO;
            },
            createMoment: function (moment, journeyId) {
                moment.aliasId = jmAliasVO._id;
                return jmMomentService.createMoment(moment, journeyId, jmAliasVO._id).then(
                    function (data) {
                        setMoment(data);
                        jmJourneyVO.moments.push(data);
                    });
            },
            updateMoment: function (moment, journeyId) {
                return jmMomentService.updateMoment(moment, journeyId, jmAliasVO._id).then(setMoment);
            },
            getMoment: function (id) {
                return jmMomentService.getMoment(id);
            }
        };

        return model;
    });

}(window.angular));
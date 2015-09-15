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
            moment.isAlias = moment.alias === jmAliasVO._id;
        };

        var model = {
            getCurrentMoment: function (id) {
                if (id) {
                    if (jmMomentVO._id !== id) {
                        jmMomentVO.invalidateMoment();
                    }
                    jmMomentService.getMoment(id).then(setMoment);
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
            updateMoment: function (moment) {
                return jmMomentService.updateMoment(moment).then(setMoment);
            },
            getMoment: function (id) {
                if (id === jmMomentVO._id) {
                    return jmMomentVO;
                }
                return jmMomentService.getMoment(id);
            }
        };

        return model;
    });

}(window.angular));
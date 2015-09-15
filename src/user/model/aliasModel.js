// @require user.user
(function (angular, undefined) {
    'use strict';

    var app = angular.module('jmUser');

    app.factory('jmAliasModel', function (jmAliasService, jmAliasVO, jmJourneyModel) {

        var setAlias = function (data) {
            jmAliasVO.setAlias(data);
            jmJourneyModel.refreshJourney();
        };

        var model = {
            getCurrentAlias: function () {
                //for now we have no way of checking whether an extensive GET was already performed
                //should maybe rethink this together with current authentication flow
                if (jmAliasVO._id) {
                    jmAliasService.getAlias(jmAliasVO._id).$promise.then(setAlias);
                }
                return jmAliasVO;

            }
        };

        return model;
    });

}(window.angular));